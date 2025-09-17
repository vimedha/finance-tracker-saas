import{
        Card,
        CardContent,
        CardHeader,
        CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";

const dateFormat="yyyy-MM-dd";
const outputFormat="yyyy-MM-dd";

const requiredOptions=[
        "amount",
        "date",
        "payee",
];

interface SelectedColumnsState{
        [key:string]:string|null;
}

type Props={
        data:string[][];
        onCancel: ()=>void;
        onSubmit: (data:any)=> void;
};

export const ImportCard=(
        {
                data,
                onCancel,
                onSubmit,
        }:Props)=>{

                const[selectedColumns, setSelectedColumns]=useState<SelectedColumnsState>({});
                const headers=data[0];
                const body=data.slice(1);
                
                const onTableHeadSelectChange=(
                        columnIndex: number,
                        value: string|null
                )=>{
                        setSelectedColumns((prev)=>{
                                const newSelectedColumns={...prev};

                                for(const key in newSelectedColumns){
                                        if(newSelectedColumns[key]===value){
                                                newSelectedColumns[key]=null;
                                        }
                                }
                              if(value==="skip"){
                                value=null;
                              }  
                              newSelectedColumns[`column_${columnIndex}`]=value;
                              return newSelectedColumns;
                        });
                };

                const progress=Object.values(selectedColumns).filter(Boolean).length;  
                
                const handleContinue=()=>{
                        console.log("Continue button clicked"); // Debug log
                        console.log("Selected columns:", selectedColumns); // Debug log
                        
                        const mappedDate={
                                headers: headers.map((_header,index)=>{
                                        return selectedColumns[`column_${index}`]||null;
                                }),
                                body:body.map((row)=>{
                                        const transformedRow=row.map((cell,index)=>{
                                                return selectedColumns[`column_${index}`]?cell:null;
                                        });
                                        return transformedRow.every((item)=>item===null)
                                        ?[]
                                        :transformedRow;
                                }).filter((row)=>row.length>0),
                        };
                        
                        console.log("Mapped data:", mappedDate); // Debug log
                       
                       const arrayOfData=mappedDate.body.map((row)=>{
                                return row.reduce((acc:any,cell,index)=>{
                                        const header=mappedDate.headers[index];
                                        if(header!==null){
                                                acc[header]=cell;
                                        }
                                        return acc;
                                },{});
                       });
                       
                       console.log("Array of data:", arrayOfData); // Debug log

                        const formattedData = arrayOfData
                          .map((item) => {
                            const rawDate = item.date?.trim();
                            const parsedDate = parse(rawDate, dateFormat, new Date());

                            if (!isValid(parsedDate)) {
                                console.log("Invalid date:", rawDate); // Debug log
                                return null;
                            }

                            return {
                              ...item,
                              amount: convertAmountToMiliunits(parseFloat(item.amount)),
                              date: format(parsedDate, outputFormat),
                            };
                          })
                          .filter(Boolean); // removes nulls

                        console.log("Formatted data:", formattedData); // Debug log
                        onSubmit(formattedData);
                };

        return(
                <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                        <Card className="border-none drop-shadow-sm">
                                <CardHeader className="gap-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2">
                                                <CardTitle className="text-xl line-clamp-1">
                                                        Import Transaction 
                                                </CardTitle>
                                                <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                                                        <Button onClick={onCancel} size="sm" className="w-full lg:w-auto">
                                                                Cancel
                                                        </Button>
                                                        <Button
                                                                className="w-full lg:w-auto"
                                                                size="sm"
                                                                disabled={progress<requiredOptions.length}
                                                                onClick={handleContinue}
                                                        >
                                                                Continue({progress}/{requiredOptions.length})
                                                        </Button>
                                                </div>
                                        </div>
                                </CardHeader>
                                <CardContent>
                                        <ImportTable
                                                headers={headers}
                                                body={body}
                                                selectedColumns={selectedColumns}
                                                onTableHeadSelectChange={onTableHeadSelectChange}
                                        />
                                </CardContent>
                        </Card>
                </div>
        );
};