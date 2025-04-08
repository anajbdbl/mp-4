"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ArtworkCard from "@/components/ArtworkCard";

export default function HomePage() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArtworks = async (query: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/art/${query}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setArtworks(data.records || []);
    } catch (error) {
      setError("Failed to fetch artworks. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold text-green-700 mb-8">Art Explorer</h1>
      
      <SearchBar onSearch={fetchArtworks} />
      
      {loading && <p className="text-green-600 text-lg mt-4">Loading artworks...</p>}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {artworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
          {artworks.map((art) => (
            <ArtworkCard
              key={art.id}
              id={art.id}
              title={art.title}
              primaryimageurl={art.primaryimageurl}
              artist={art.people?.[0]?.name || "Unknown Artist"}
              date={art.dated}
            />
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500 mt-8">No artworks found. Try searching for an artist.</p>
      )}
    </div>
  );
}
