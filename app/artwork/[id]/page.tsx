import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArtworkDetails({ params }: { params: { id: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;

  if (!apiKey) {
    console.error("Missing API Key");
    return notFound();
  }

  const artworkId = params.id;
  const url = `https://api.harvardartmuseums.org/object/${artworkId}?apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`API Error: ${res.statusText}`);
      return notFound();
    }
    const data = await res.json();

    if (!data || !data.primaryimageurl) {
      console.error("No Image Found");
      return notFound();
    }

    const artworkInfo = data.technique || data.creditline || data.provenance || "No additional information available.";

    return (
      <div className="min-h-screen bg-green-50 p-6">
        <Link href="/" className="text-green-600 hover:underline mb-4 inline-block">
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-green-700 mb-6">{data.title || "Untitled"}</h1>

        <div className="w-full flex justify-center mb-6">
          <Image
            src={data.primaryimageurl}
            alt={data.title || 'Artwork Image'}
            width={800}
            height={600}
            className="rounded-lg object-contain"
          />
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-700">{artworkInfo}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Artist:</span> {data.people?.[0]?.name || "Unknown"} ({data.dated || "Unknown Date"})
          </p>
          {data.medium && (
            <p className="text-gray-600">
              <span className="font-semibold">Medium:</span> {data.medium}
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="text-red-500">Failed to load artwork details. Please try again later.</p>;
  }
}
