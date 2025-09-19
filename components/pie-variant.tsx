import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  LegendPayload
} from "recharts";
import { formatPercentage } from "@/lib/utils";
import { CategoryTooltip } from "@/components/category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

<<<<<<< HEAD
export const PieVariant=({data}:Props)=>{
        return(
                <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                                <Legend
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content={({ payload }: any) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <ul className="flex flex-col space-y-2">
        {payload?.map((entry: any, index: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          const percentage = (entry.payload.value / total) * 100;
          return (
            <li 
              key={`item-${index}`}
              className="flex items-center space-x-2"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <div className="space-x-1">
                <span className="text-sm text-muted-foreground">
                  {entry.value}
                </span>
                <span className="text-sm">
                  {formatPercentage(percentage)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    )
  }}
/>
<Tooltip content={<CategroyTooltip/>}/>
                                <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={60}
                                paddingAngle={2}
                                fill="#8884d8"
                                dataKey="value"
                                labelLine={false}
                                >
                                        {data.map((_entry,index)=>(
                                                <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index%COLORS.length]}
                                                />
                                        ))}
                                </Pie>
                        </PieChart>

                </ResponsiveContainer>
        )
}
=======
export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          content={({ payload }) => {
            if (!payload) return null;
            const total = data.reduce((sum, item) => sum + item.value, 0);
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: LegendPayload, index: number) => {
                  // Check that entry.payload and entry.payload.value exist to avoid errors
                  const value = entry.payload?.value ?? 0;
                  const percentage = (value / total) * 100;
                  return (
                    <li
                      key={`item-${index}`}
                      className="flex items-center space-x-2"
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <div className="space-x-1">
                        <span className="text-sm text-muted-foreground">
                          {entry.value}
                        </span>
                        <span className="text-sm">
                          {formatPercentage(percentage)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        />
        <Tooltip content={(props) => <CategoryTooltip {...props} />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
>>>>>>> e6f2f87244a51c1d1a44ec697a6d2203f5c9652a
