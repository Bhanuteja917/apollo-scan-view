import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (projectName: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [projectName, setProjectName] = useState('');

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
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter GitLab project/repository name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="h-11"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="h-11 px-6"
            disabled={isLoading || !projectName.trim()}
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}