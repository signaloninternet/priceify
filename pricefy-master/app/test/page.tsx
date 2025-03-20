"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ShoppingCart, Loader2, Search } from "lucide-react";

export default function Compare() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      fetchPrices();
      fetchImage();
    }
  }, [product]);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/compare?product=${product}`);
      if (!response.ok) throw new Error("Failed to fetch prices");
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/unsplash?query=${product}`);
      if (!response.ok) throw new Error("Failed to fetch image");
      const data = await response.json();
      setImage(data.image);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-lg text-gray-200">
          Finding the best prices...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-row items-center mb-8 pt-8">
  <div className="w-[50%]">
    <h1 className="text-3xl font-bold text-white-100"><span className="text-[#1DB954]">Search results for: </span> {product}</h1>
  </div>

  <div className="text-center hidden md:flex w-[50%]">
    <a
      href="/"
      className="inline-flex items-center text-primary hover:text-primary-hover font-semibold text-lg transition-colors"
    >
      <Search className="mr-2 h-5 w-5" />
      Search for another product
    </a>
  </div>
</div>


        {results.length > 0 ? (
          <div className="md:grid md:grid-cols-12 md:gap-8 ">
            {/* Left Column - Product Image */}
            {image && (
              <div className="hidden md:block md:col-span-5 lg:col-span-5 md:mt-8">
                <div className="sticky top-8">
                  <div className="aspect-square overflow-hidden rounded-3xl bg-gray-700 p-8">
                    <img
                      src={image}
                      alt={product}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Right Column - Prices */}
            <div className="md:col-span-7 lg:col-span-7 space-y-6">
              {/* Mobile Image */}
              {image && (
                <div className="md:hidden aspect-square overflow-hidden rounded-3xl bg-gray-700 p-8 mb-6">
                  <img
                    src={image}
                    alt={product}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Price Cards */}
              <div className="grid gap-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white-100 mb-2">
                          {result.site}
                        </h3>
                        <p className="text-2xl font-bold text-primary">
                          {result.price !== "Error fetching price"
                            ? `₹${result.price}`
                            : "Price not available"}
                        </p>
                      </div>
                      {result.price !== "Error fetching price" && (
                        <a
                          href={result.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-primary text-white-100 px-6 py-3 rounded-xl font-medium transition-colors hover:bg-primary-hover group"
                        >
                          Visit Store
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <a
                  href="/"
                  className="inline-flex items-center text-primary hover:text-primary-hover font-semibold text-lg transition-colors"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search for another product
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-700 rounded-xl shadow-lg">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-xl text-gray-200">
              No results found for "{product}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}