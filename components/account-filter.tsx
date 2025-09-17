"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import qs from "query-string";
import {
  useRouter,
  usePathname,
  useSearchParams
} from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const AccountFilter = () => {
const router=useRouter();
const pathname=usePathname();
const onChange=(newValue: string)=>{
        const query={
                accountId:newValue,
                from,
                to,
        };
        if(newValue==="all"){
                query.accountId="";
        }
        const url=qs.stringifyUrl({
                url:pathname,
                query,
        },{skipNull:true, skipEmptyString:true});
router.push(url);
};

        const params= useSearchParams();
        const accountId=params.get("accountId")||"all";
        const from=params.get("from")||"";
        const to=params.get("to")||"";
        const{
        isLoading:isLoadingSummary,
}=useGetSummary({from, to});
        const{
                data: accounts,
                isLoading:isLoadingAccounts,
        }=useGetAccounts();
        return(
                <Select
                value={accountId}
                onValueChange={onChange}
                disabled={isLoadingAccounts||isLoadingSummary}
                >
<SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-blue-500 hover:bg-blue-600 !text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-blue-100 transition [&>span]:!text-white [&>svg]:!text-white [&>svg]:!fill-white">
  <SelectValue placeholder="Select account" />
                        
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value="all">
                                        Select accounts
                                </SelectItem>
                                {accounts?.map((account)=>(
                                        <SelectItem key={account.id} value={account.id}>
                                                {account.name}
                                        </SelectItem>
                                ))}
                        </SelectContent>
                </Select>
        )

}