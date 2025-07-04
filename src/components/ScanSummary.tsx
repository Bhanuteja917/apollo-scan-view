import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, ExternalLink, Calendar } from 'lucide-react';

interface ScanSummaryProps {
  isLoading: boolean;
  hasResults: boolean;
}

const mockData = {
  projectName: 'my-awesome-app',
  lastScanDate: '2024-01-15',
  score: 8.5,
  trend: 'improving' as const,
  languages: ['TypeScript', 'JavaScript', 'CSS'],
  gitlabUrl: 'https://gitlab.com/user/my-awesome-app'
};

export function ScanSummary({ isLoading, hasResults }: ScanSummaryProps) {
  if (!hasResults && !isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Latest Scan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Search for a GitLab project to view scan results</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Latest Scan Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
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
        <CardTitle className="flex items-center justify-between">
          Latest Scan Summary
          <Badge variant="secondary" className="text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            {mockData.lastScanDate}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Name */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Project</h4>
            <p className="text-lg font-semibold">{mockData.projectName}</p>
          </div>

          {/* Score */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Score</h4>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${getScoreColor(mockData.score)}`}>
                {mockData.score}
              </span>
              <span className="text-muted-foreground">/10</span>
              {getTrendIcon(mockData.trend)}
            </div>
          </div>

          {/* Trend */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Trend</h4>
            <Badge 
              variant={mockData.trend === 'improving' ? 'default' : 'destructive'}
              className="capitalize"
            >
              {mockData.trend}
            </Badge>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Languages</h4>
            <div className="flex flex-wrap gap-1">
              {mockData.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* GitLab Link */}
          <div className="space-y-2 md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-medium text-muted-foreground">GitLab Project</h4>
            <Button variant="outline" size="sm" asChild>
              <a href={mockData.gitlabUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                View on GitLab
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}