import { Suspense } from "react";
import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

<<<<<<< HEAD
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
=======
export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a
