"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { time: "09:00", open: 2.5, high: 3.0, low: 2.2, close: 2.8, volume: 8500000 },
  { time: "10:00", open: 2.8, high: 3.2, low: 2.5, close: 2.9, volume: 6200000 },
  { time: "11:00", open: 2.9, high: 3.5, low: 2.7, close: 3.3, volume: 9200000 },
  { time: "12:00", open: 3.3, high: 3.8, low: 3.0, close: 3.1, volume: 7800000 },
  { time: "13:00", open: 3.1, high: 3.4, low: 2.8, close: 2.9, volume: 6800000 },
  { time: "14:00", open: 2.9, high: 3.1, low: 2.5, close: 2.6, volume: 5400000 },
  { time: "15:00", open: 2.6, high: 2.9, low: 2.3, close: 2.7, volume: 7100000 },
  { time: "16:00", open: 2.7, high: 3.0, low: 2.4, close: 2.8, volume: 6300000 },
  { time: "17:00", open: 2.8, high: 3.2, low: 2.6, close: 3.0, volume: 8900000 },
  { time: "18:00", open: 3.0, high: 3.3, low: 2.8, close: 2.9, volume: 7600000 },
  { time: "19:00", open: 2.9, high: 3.1, low: 2.6, close: 2.7, volume: 5800000 },
  { time: "20:00", open: 2.7, high: 2.9, low: 2.4, close: 2.5, volume: 4200000 },
]

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  },
}

export function TradingChart() {
  return (
    <div className="h-80 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
      <ChartContainer config={chartConfig} className="h-full">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="price"
            orientation="left"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <YAxis 
            yAxisId="volume"
            orientation="right"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  if (name === "volume") {
                    return [`${(Number(value) / 1000000).toFixed(2)}M`, "Volume"]
                  }
                  return [`$${Number(value).toFixed(2)}`, "Price"]
                }}
                labelFormatter={(label) => `Time: ${label}`}
              />
            }
          />
          <Bar
            yAxisId="volume"
            dataKey="volume"
            fill="#10b981"
            opacity={0.6}
            radius={[2, 2, 0, 0]}
          />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#3b82f6" }}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}


