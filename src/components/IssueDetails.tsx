import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Info, AlertCircle, FileText } from 'lucide-react';

interface IssueDetailsProps {
  selectedScan: number;
  isLoading: boolean;
}

const mockIssues = {
  1: [
    {
      id: 1,
      fileName: 'src/components/UserAuth.tsx',
      lineNumber: 45,
      severity: 'high' as const,
      category: 'Security',
      description: 'Potential SQL injection vulnerability in user authentication logic',
      rule: 'security/no-sql-injection'
    },
    {
      id: 2,
      fileName: 'src/utils/validation.ts',
      lineNumber: 23,
      severity: 'medium' as const,
      category: 'Code Quality',
      description: 'Function complexity exceeds recommended threshold (15)',
      rule: 'complexity/function-complexity'
    },
    {
      id: 3,
      fileName: 'src/pages/Dashboard.tsx',
      lineNumber: 78,
      severity: 'low' as const,
      category: 'Performance',
      description: 'Unused import statement detected',
      rule: 'imports/no-unused-imports'
    },
    {
      id: 4,
      fileName: 'src/api/client.ts',
      lineNumber: 12,
      severity: 'medium' as const,
      category: 'Security',
      description: 'Hardcoded API endpoint URL should be configurable',
      rule: 'security/no-hardcoded-secrets'
    },
    {
      id: 5,
      fileName: 'src/components/Modal.tsx',
      lineNumber: 34,
      severity: 'low' as const,
      category: 'Accessibility',
      description: 'Missing aria-label for interactive element',
      rule: 'a11y/missing-aria-label'
    }
  ]
};

export function IssueDetails({ selectedScan, isLoading }: IssueDetailsProps) {
  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Scan Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const issues = mockIssues[selectedScan as keyof typeof mockIssues] || mockIssues[1];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'low':
        return <Info className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive' as const;
      case 'medium':
        return 'secondary' as const;
      case 'low':
        return 'outline' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Scan Issues (Scan #{selectedScan})</span>
          <Badge variant="outline" className="text-xs">
            {issues.length} issues found
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getSeverityIcon(issue.severity)}
                  <Badge variant={getSeverityVariant(issue.severity)} className="text-xs capitalize">
                    {issue.severity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {issue.category}
                  </Badge>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {issue.rule}
                </code>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {issue.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="font-mono">{issue.fileName}</span>
                  <span>Line {issue.lineNumber}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}