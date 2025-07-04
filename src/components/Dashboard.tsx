import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from './SearchBar';
import { ScanSummary } from './ScanSummary';
import { ScoreChart } from './ScoreChart';
import { ScanHistory } from './ScanHistory';
import { IssueDetails } from './IssueDetails';
import { Search, GitBranch } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Dashboard() {
  const [selectedScan, setSelectedScan] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleSearch = async (projectName: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setHasResults(true);
  };

  const handleClear = () => {
    setHasResults(false);
    setSelectedScan(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <GitBranch className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">ApolloScan Dashboard</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} onClear={handleClear} isLoading={isLoading} hasResults={hasResults} />
        
        {/* Latest Scan Summary */}
        <ScanSummary isLoading={isLoading} hasResults={hasResults} />
        
        {/* Score Chart */}
        <ScoreChart isLoading={isLoading} hasResults={hasResults} />
        
        {/* Scan History Table */}
        <ScanHistory 
          selectedScan={selectedScan} 
          onSelectScan={setSelectedScan}
          isLoading={isLoading}
          hasResults={hasResults}
        />
        
        {/* Issue Details */}
        <IssueDetails selectedScan={selectedScan} isLoading={isLoading} hasResults={hasResults} />
      </main>
    </div>
  );
}