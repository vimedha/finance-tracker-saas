"use client";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import{
        Card,
        CardContent,
        CardHeader,
        CardTitle,
} from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns} from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";


import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import {transactions as transactionSchema} from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";


enum VARIANTS{
  LIST="LIST",
  IMPORT="IMPORT"
};
// Explicitly typed to match react-papaparse output and resolve type mismatches
const INITIAL_IMPORT_RESULTS: { data: string[][]; errors: Array<{ row: number; message: string }>; meta: Record<string, unknown> } = {
  data: [],
  errors: [],
  meta: {},
};


const TransactionsPageContent = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log({ results });
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };
  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };
  const newTransaction = useNewTransaction();
  const createTransactions = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  const isDisabled =
    transactionsQuery.isLoading ||
    deleteTransactions.isPending;

  const onSubmitImport = async (
    values: typeof transactionSchema.$inferInsert[],
  ) => {
    const accountId = await confirm();
    if (!accountId) {
      return toast.error("Please select an account to confirm.")
    }
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));
    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };
  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2">
            <CardTitle className="text-xl line-clamp-1">
              Transaction History
            </CardTitle>
            <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
              <Button onClick={newTransaction.onOpen} size="sm" className="w-full lg:w-auto">
                <Plus className="size-3.5" />
                Add new
              </Button>
              <div className="w-full lg:w-auto">
                <UploadButton onUpload={onUpload} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            columns={columns}
            data={transactions}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled} />
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsPageContent />
    </Suspense>
  );
};

export default TransactionsPage;
