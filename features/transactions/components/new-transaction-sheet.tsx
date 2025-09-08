import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle
} from "@/components/ui/sheet";
import {useNewTransaction} from "@/features/transactions/hooks/use-new-transaction"
import { insertTransactionSchema } from "@/db/schema";
import {z} from "zod";
import { useCreateTransaction } from "@/features/transactions//api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
const formSchema = insertTransactionSchema.omit({
        id:true,
})

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
        const {isOpen,onClose}= useNewTransaction();
        const mutation=useCreateTransaction();
        const categoryQuery=useGetCategories();
        const categoryMutation=useCreateCategory();
        const categoryOptions=(categoryQuery.data ?? []).map((category)=>({
                label: category.name,
                value: category.id,
        }));
        const onCreateCategory= (name: string)=> categoryMutation.mutate({
                name
        });
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
                                New Transaction
                        </SheetTitle>
                        <SheetDescription>
                               Add a new Transaction.
                        </SheetDescription>
                </SheetHeader>
                <p>TODO: Transaction Form</p>
                </SheetContent>
                </Sheet>
        )
}
