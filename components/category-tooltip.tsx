import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

<<<<<<< HEAD
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
    };
    value: number;
  }>;
}

export const CategroyTooltip=({active,payload}:TooltipProps)=>{
        if(!active || !payload || payload.length === 0)return null;
        const name=payload[0].payload.name;
        const value=payload[0].value;
        
=======
// Define specific types for props (replaces 'any')
interface PayloadItemPayload {
  name: string;
}
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a

interface PayloadItem {
  payload: PayloadItemPayload;
  value: number;
}

interface CategoryTooltipProps {
  active: boolean;
  payload: PayloadItem[];
}

export const CategoryTooltip = ({ active, payload }: CategoryTooltipProps) => {
  if (!active) return null;
  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
