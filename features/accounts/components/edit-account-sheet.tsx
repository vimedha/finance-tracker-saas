import {AccountForm} from "@/features/accounts/components/account-form";
import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { insertAccountSchema } from "@/db/schema";
import {z} from "zod";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { Loader2 } from "lucide-react";
import { use } from "react";
const formSchema = insertAccountSchema.pick({
        name:true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
        const {isOpen,onClose,id}= useOpenAccount();

        const [ConfirmDialog, confirm]=useConfirm(
                "Are your sure?",
                "You are about to delete this transaction."
        );
        const accountQuery=useGetAccount(id)
        const editMutation = useEditAccount(id);
        const deleteMutation = useDeleteAccount(id);
        const isPending = editMutation.isPending||deleteMutation.isPending;
        const isLoading=accountQuery.isLoading;
        const onSubmit=(values: FormValues)=>{
                editMutation.mutate(values,{
                        onSuccess:()=>{
                                onClose();
                        },
                });

        };
        const onDelete=async()=>{
                const ok = await confirm();
                if(ok){
                        deleteMutation.mutate(undefined,{
                                onSuccess:()=>{
                                        onClose();
                                }
                        });
                }
        };
        const defaultValues=accountQuery.data?{
                name:accountQuery.data.name
        }:{
                name:"",
        };
        return(
                <>
                <ConfirmDialog/>
                <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                <SheetHeader>
                        <SheetTitle>
                                Edit Account
                        </SheetTitle>
                        <SheetDescription>
                                Edit an existing account.
                        </SheetDescription>
                </SheetHeader>
                {isLoading?(
                        <div className="absolute inset-0 felx items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                                </div>
                ):(
                
                <AccountForm 
                id={id} 
                onSubmit={onSubmit} 
                disabled={isPending} 
                defaultValues={defaultValues}
                onDelete={onDelete}/>
        )
}
                </SheetContent>
                </Sheet>
                </>
        )
}
