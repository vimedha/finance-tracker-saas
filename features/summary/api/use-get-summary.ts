import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/hono";
import { useSearchParams } from "next/navigation";

      export const useGetSummary = (p0: { from: string | undefined; to: string | undefined; }) => {
        const params = useSearchParams();
        const from = params.get("from")||"";
        const to = params.get("to")||"";
        const accountId = params.get("accountId")||"";
        const query = useQuery({
                queryKey: ["summary", {from, to, accountId}],
                queryFn: async()=>{
                        const response = await client.api.summary.$get({
                                query:{
                                        from,
                                        to,
                                        accountId,
                                },
                        });
                        if(!response.ok){
                                throw new Error("Failed to fetch summary");
                        }
                       const{data} = await response.json();
return{
    ...data,
    // Remove all conversions since API already returns correct amounts
    incomeAmount: data.incomeAmount,
    expensesAmount: data.expensesAmount,
    remainingAmount: data.remainingAmount,
    categories: data.categories.map((category)=>({
        ...category,
        value: category.value, // Remove conversion
    })),
    days: data.days.map((day)=>({
        ...day,
        income: day.income, // Remove conversion
        expenses: day.expenses, // Remove conversion
    }))
}
                },
        });
        return query;
      };