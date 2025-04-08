import Image from 'next/image';
import Link from 'next/link';
import { ArtworkProps } from '@/types';

export default function ArtworkCard({ id, title, primaryimageurl, artist, date }: ArtworkProps) {
  const imageUrl = primaryimageurl || '/fallback-image.png';

  return (
    <Link href={`/artwork/${id}`} className="block">
      <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
        {primaryimageurl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={300}
            className="w-full h-60 object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-gray-600">{artist || "Unknown Artist"} ({date || "Unknown Date"})</p>
      </div>
    </Link>
  );
}
