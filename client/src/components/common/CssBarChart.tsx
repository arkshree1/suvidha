interface BarData {
  label: string;
  value: number;
  displayValue?: string;
}

interface CssBarChartProps {
  data: BarData[];
  maxValue?: number;
  barColor?: string;
  height?: number;
}

export default function CssBarChart({ data, maxValue, barColor = '#006EB3', height = 200 }: CssBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="w-full" data-testid="css-bar-chart">
      <div className="flex items-end justify-between gap-3" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const barHeight = max > 0 ? (item.value / max) * 100 : 0;
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[14px] font-semibold text-[#212529] mb-1">
                {item.displayValue || item.value}
              </span>
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${barHeight}%`,
                  background: barColor,
                  minHeight: barHeight > 0 ? '4px' : '0',
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-3 mt-2 border-t-2 border-[#DEE2E6] pt-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <span className="text-[13px] text-[#6C757D] font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
