import{
        RadialBar,
        RadialBarChart,
        Legend,
        
        ResponsiveContainer,
        Tooltip
}from "recharts";
import {formatCurrency} from "@/lib/utils";
import { CategroyTooltip } from "@/components/category-tooltip";

const COLORS=["#0062FF","#12C6FF","#FF647F","#FF9354"];

type Props={
        data:{
                name: string;
                value: number;
        }[];
};

export const RadialVariant=({data}:Props)=>{
        return(
                <ResponsiveContainer width="100%" height={350}>
                        <RadialBarChart
                        cx="50%"
                        cy="30%"
                        barSize={10}
                        innerRadius="90%"
                        outerRadius="40%"
                        data={data.map((item,index)=>({
                          ...item,
                          fill: COLORS[index% COLORS.length]
                        }))}
                        >
                        <RadialBar
                        background
                        dataKey="value"
                        />  
                                <Legend
  content={({ payload }: any) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <ul className="flex flex-col space-y-2">
        {payload.map((entry: any, index: number) => {
          return (
            <li 
              key={`item-${index}`}
              className="flex items-center space-x-2"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <div className="space-x-1">
                <span className="text-sm text-muted-foreground">
                  {entry.value}
                </span>
                <span className="text-sm">
                  {formatCurrency(entry.payload.value)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    )
  }}
/>
<Tooltip content={<CategroyTooltip/>}/>
                                
                        </RadialBarChart>

                </ResponsiveContainer>
        )
}