"use client";

import HeroCarousel from "@/components/HeroCarousel";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [product, setProduct] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.trim()) {
      router.push(`/test?product=${encodeURIComponent(product)}`);
    }
  };

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={24}
                height={24}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> PriceFy</span>
            </h1>

            <p className="mt-6 text-white">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <form onSubmit={handleSearch} className="relative w-full max-w-lg pt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for any product..."
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full p-4 pr-24 bg-gray-700 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-300 text-white-100 transition-all duration-300 ease-in-out focus:scale-105"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white-100 px-4 py-2 rounded-full font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ease-in-out hover:scale-105"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <HeroCarousel />
        </div>
      </section>
    </>
  );
};

export default Home;
