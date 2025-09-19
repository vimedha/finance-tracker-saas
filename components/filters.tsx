import { Suspense } from "react";
import { AccountFilter } from "@/components/account-filter"
import { DateFilter } from "./date-filter"

export const Filters=()=>{
        return(
                <Suspense fallback={<div>Loading filters...</div>}>
                        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
                                <AccountFilter/>
                                <DateFilter/>
                        </div>
                </Suspense>
        )
}