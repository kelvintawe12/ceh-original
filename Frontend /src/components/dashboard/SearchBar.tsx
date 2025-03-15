import React, { useEffect, useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
type SearchBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  setIsOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
    setSearchResults([{
      id: 1,
      title: 'Result 1',
      type: 'project'
    }, {
      id: 2,
      title: 'Result 2',
      type: 'event'
    }
    // Add more mock results
    ]);
  };
  return <div ref={searchRef} className="relative">
      <div className="relative">
        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400" value={searchQuery} onChange={e => handleSearch(e.target.value)} onFocus={() => setIsOpen(true)} />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        {searchQuery && <button onClick={() => {
        setSearchQuery('');
        setSearchResults([]);
      }} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>}
      </div>
      {isOpen && searchResults.length > 0 && <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {searchResults.map(result => <div key={result.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {result.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {result.type}
                </div>
              </div>)}
          </div>
        </div>}
    </div>;
};