<<<<<<< HEAD
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
=======

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a

 type Props={
       
        account: string;
        accountId: string;
 };

 export const AccountColumn=({
        
        account,
        accountId
 }: Props)=>{
        const{onOpen: onOpenAccount}=useOpenAccount();

        const onClick=()=>{
               
                onOpenAccount(accountId);
        };
        return (
                <div
                onClick={onClick}
                className="flex items-center cursor-pointer hover:underline">
                        {account}
                </div>
        )
 }