import {AccountForm} from "@/features/accounts/components/account-form";
import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle
} from "@/components/ui/sheet";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { insertAccountSchema } from "@/db/schema";
import {z} from "zod";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
const formSchema = insertAccountSchema.pick({
        name:true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
        const {isOpen,onClose}= useNewAccount();
        const mutation=useCreateAccount();
        const onSubmit=(values: FormValues)=>{
                mutation.mutate(values,{
                        onSuccess:()=>{
                                onClose();
                        },
                });

        };
        return(
                <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                <SheetHeader>
                        <SheetTitle>
                                New Account
                        </SheetTitle>
                        <SheetDescription>
                                Create n new account to track your transaction.
                        </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name:"",}}/>
                </SheetContent>
                </Sheet>
        )
}
