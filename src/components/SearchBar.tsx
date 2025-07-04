import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (projectName: string) => void;
  onClear: () => void;
  isLoading: boolean;
  hasResults: boolean;
}

export function SearchBar({ onSearch, onClear, isLoading, hasResults }: SearchBarProps) {
  const [projectName, setProjectName] = useState('');

  const handleClear = () => {
    setProjectName('');
    onClear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onSearch(projectName.trim());
    }
  };

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Enter GitLab project/repository name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="h-11 pr-10"
              disabled={isLoading}
            />
            {projectName && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
                onClick={() => setProjectName('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button 
            type="submit" 
            className="h-11 px-6"
            disabled={isLoading || !projectName.trim()}
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
          {hasResults && (
            <Button 
              type="button" 
              variant="outline"
              className="h-11 px-6"
              onClick={handleClear}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Results
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}