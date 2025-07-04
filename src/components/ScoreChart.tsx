import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScoreChartProps {
  isLoading: boolean;
  hasResults: boolean;
}

const mockChartData = [
  { date: '2024-01-01', score: 7.2 },
  { date: '2024-01-03', score: 7.5 },
  { date: '2024-01-05', score: 7.8 },
  { date: '2024-01-07', score: 7.4 },
  { date: '2024-01-09', score: 8.1 },
  { date: '2024-01-11', score: 8.3 },
  { date: '2024-01-13', score: 8.7 },
  { date: '2024-01-15', score: 8.5 },
];

export function ScoreChart({ isLoading, hasResults }: ScoreChartProps) {
  if (!hasResults && !isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Score trend will appear here after searching</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Score Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 12 }}
                tickCount={6}
              />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [value.toFixed(1), 'Score']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--chart-primary))', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: 'hsl(var(--chart-primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}