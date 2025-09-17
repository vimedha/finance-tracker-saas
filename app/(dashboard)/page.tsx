import { Suspense } from "react";
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

const DashboardPageContent = () => {
  return(
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid/>
      <DataCharts/>
    </div>
  );
};

export default function DashboardPage(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageContent />
    </Suspense>
  );
};