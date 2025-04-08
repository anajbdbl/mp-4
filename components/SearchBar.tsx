"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-6">
      <input
        type="text"
        placeholder="Search for an artist...(Eg. Monet)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 border rounded-lg shadow-md w-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"/>
      <button type="submit" className="ml-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Search
      </button>
    </form>
  );
}
