import { LineChart as LucideLineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartTooltip } from '../chart';

interface LineChartProps {
  data: Array<{
    date: string;
    score: number;
    blendingScore?: number;
    segmentingScore?: number;
    totalScore?: number;
  }>;
  title: string;
  color?: string;
}

export function LineChart({ data, title, color = '#16a34a' }: LineChartProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-2xl">
          <LucideLineChart className="text-blue-500 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="h-[300px] w-full bg-gray-50 rounded-2xl border border-gray-100 p-6">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="date" className="text-sm text-gray-500" tick={{ fill: '#6b7280' }} />
            <YAxis className="text-sm text-gray-500" tick={{ fill: '#6b7280' }} />
            <ChartTooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
                    <div className="space-y-2">
                      <p className="font-bold text-gray-900 border-b pb-2">{label}</p>
                      {data.blendingScore !== undefined && (
                        <div className="flex justify-between gap-4">
                          <span className="font-medium text-green-600">Blending:</span>
                          <span className="text-gray-600">{data.blendingScore}</span>
                        </div>
                      )}
                      {data.segmentingScore !== undefined && (
                        <div className="flex justify-between gap-4">
                          <span className="font-medium text-red-600">Segmenting:</span>
                          <span className="text-gray-600">{data.segmentingScore}</span>
                        </div>
                      )}
                      {data.totalScore !== undefined && (
                        <div className="flex justify-between gap-4 border-t pt-2">
                          <span className="font-bold text-purple-600">Total:</span>
                          <span className="font-bold text-gray-900">{data.totalScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
