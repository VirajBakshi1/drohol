'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  data: any[];
  onSearch: (filteredData: any[]) => void;
  searchFields: string[];
  placeholder?: string;
}

// Helper function to get nested object values
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
};

export default function SearchBar({
  data,
  onSearch,
  searchFields,
  placeholder = "Search..."
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get unique suggestions from all searchable fields
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase();
    const allTerms = new Set<string>();

    data.forEach(item => {
      searchFields.forEach(field => {
        const value = getNestedValue(item, field);
        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          // Extract words that match the query
          const words = value.split(/\s+/);
          words.forEach(word => {
            if (word.toLowerCase().includes(query)) {
              allTerms.add(word);
            }
          });
        }
      });
    });

    return Array.from(allTerms)
      .filter(term => term.length > 2)
      .slice(0, 5);
  }, [searchQuery, data, searchFields]);

  // Filter data based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      onSearch(data);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = data.filter(item => {
      return searchFields.some(field => {
        const value = getNestedValue(item, field);
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });

    onSearch(filtered);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch(data);
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none text-gray-900 placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-2">
              <p className="text-xs font-medium text-gray-500 px-3 py-2">Suggestions</p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-cyan-50 rounded-lg transition-colors text-sm text-gray-700 flex items-center gap-2"
                >
                  <Search className="h-4 w-4 text-cyan-600" />
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
