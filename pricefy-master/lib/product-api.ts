// lib/product-api.ts

export interface ProductPrice {
  store: string;
  amount: number;
  url: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  prices: ProductPrice[];
  bestPrice: boolean;
  category: string;
}

const API_KEY = process.env.SERPAPI_KEY;

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${API_KEY}&gl=in&hl=en&currency=INR`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const productMap = new Map<string, Product>();

    data.shopping_results?.forEach((result: any) => {
      const normalizedTitle = result.title.toLowerCase().trim();
      const existingProduct = productMap.get(normalizedTitle);

      // Parse price, handling ₹ symbol and commas
      const priceText = result.price || '';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '').replace(/,/g, '')) || 0;

      const store = result.source.replace(/\.com$/, '');

      if (existingProduct) {
        existingProduct.prices.push({
          store,
          amount: price,
          url: result.link,
        });
      } else {
        productMap.set(normalizedTitle, {
          id: result.product_id,
          title: result.title,
          image: result.thumbnail,
          prices: [{
            store,
            amount: price,
            url: result.link,
          }],
          bestPrice: false,
          category: result.source,
        });
      }
    });

    const products = Array.from(productMap.values());

    // Find the absolute best price across all products
    let globalMinPrice = Infinity;
    let bestProductId = '';

    products.forEach(product => {
      const minPrice = Math.min(...product.prices.map(p => p.amount));
      if (minPrice < globalMinPrice) {
        globalMinPrice = minPrice;
        bestProductId = product.id;
      }
    });

    // Mark best price and sort prices for each product
    return products.map(product => ({
      ...product,
      prices: product.prices.sort((a, b) => a.amount - b.amount),
      bestPrice: product.id === bestProductId,
    }));

  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
