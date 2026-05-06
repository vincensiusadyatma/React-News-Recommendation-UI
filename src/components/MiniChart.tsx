import ChartCard from "./ChartCard";
import { LineChart } from "@mui/x-charts/LineChart";
type MiniChartProps = {
  title: string;
  data: number[];
  kValues: number[];
  color: string;
};

const MiniChart = ({ title, data, kValues, color }: MiniChartProps) => {
  return (
    <ChartCard title={title}>
      <LineChart
        xAxis={[{ data: kValues }]}
        yAxis={[{ min: 0, max: 1 }]}
        series={[
          {
            data,
            color,
            showMark: true,
          },
        ]}
        height={250}
        margin={{ top: 20, bottom: 30, left: 40, right: 20 }}

      
        grid={{ vertical: true, horizontal: true }}

        slotProps={{
          mark: {
            shape: "circle",
            r: 4,
            strokeWidth: 0,
          },
        }}
      />
    </ChartCard>
  );
};

export default MiniChart;