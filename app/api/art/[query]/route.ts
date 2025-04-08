import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { query: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_HARVARD_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const query = decodeURIComponent(params.query);
  console.log("Searching for artist:", query);

  const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&person=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return NextResponse.json({ error: "Error fetching artwork" }, { status: 500 });
  }
}
