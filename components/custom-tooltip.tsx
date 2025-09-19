import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

<<<<<<< HEAD
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      date: string;
    };
    value: number;
  }>;
}

export const CustomTooltip=({active,payload}:CustomTooltipProps)=>{
        if(!active || !payload || payload.length < 2)return null;
        const date=payload[0].payload.date;
        const income=payload[0].value;
        const expenses=payload[1].value;
=======
// Define specific types for props (replaces 'any')
interface TooltipPayloadItemPayload {
  date: Date; // Matches the 'date' accessed in the code
}
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a

interface TooltipPayloadItem {
  payload: TooltipPayloadItemPayload;
  value: number;
}

interface CustomTooltipProps {
  active: boolean;
  payload: TooltipPayloadItem[];
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active) return null;
  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expenses = payload[1].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
