import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();

    if (data.results.length > 0) {
      return NextResponse.json({ image: data.results[0].urls.regular }, { status: 200 });
    }

    return NextResponse.json({ error: "No images found" }, { status: 404 });
  } catch (error) {
    console.error("Unsplash API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
