import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface ScanHistoryProps {
  selectedScan: number;
  onSelectScan: (scanId: number) => void;
  isLoading: boolean;
  hasResults: boolean;
}

const mockHistoryData = [
  {
    id: 1,
    scanNumber: 'S-2024-001',
    date: '2024-01-15',
    score: 8.5,
    trend: 'improving' as const,
    commitSha: 'a1b2c3d',
    triggeredBy: 'john.doe'
  },
  {
    id: 2,
    scanNumber: 'S-2024-002',
    date: '2024-01-13',
    score: 8.7,
    trend: 'improving' as const,
    commitSha: 'e4f5g6h',
    triggeredBy: 'jane.smith'
  },
  {
    id: 3,
    scanNumber: 'S-2024-003',
    date: '2024-01-11',
    score: 8.3,
    trend: 'worsening' as const,
    commitSha: 'i7j8k9l',
    triggeredBy: 'scheduler'
  },
  {
    id: 4,
    scanNumber: 'S-2024-004',
    date: '2024-01-09',
    score: 8.1,
    trend: 'improving' as const,
    commitSha: 'm1n2o3p',
    triggeredBy: 'bob.wilson'
  },
  {
    id: 5,
    scanNumber: 'S-2024-005',
    date: '2024-01-07',
    score: 7.4,
    trend: 'worsening' as const,
    commitSha: 'q4r5s6t',
    triggeredBy: 'scheduler'
  }
];

export function ScanHistory({ selectedScan, onSelectScan, isLoading, hasResults }: ScanHistoryProps) {
  if (!hasResults && !isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Scan history will appear here after searching</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'improving' ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scan Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Commit SHA</TableHead>
                <TableHead>Triggered By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistoryData.map((scan) => (
                <TableRow 
                  key={scan.id}
                  className={selectedScan === scan.id ? 'bg-muted/50' : ''}
                >
                  <TableCell className="font-medium">{scan.scanNumber}</TableCell>
                  <TableCell>{scan.date}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getScoreColor(scan.score)}`}>
                      {scan.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(scan.trend)}
                      <Badge 
                        variant={scan.trend === 'improving' ? 'default' : 'destructive'}
                        className="text-xs capitalize"
                      >
                        {scan.trend}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {scan.commitSha}
                    </code>
                  </TableCell>
                  <TableCell>{scan.triggeredBy}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectScan(scan.id)}
                      className="h-8 px-2"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}