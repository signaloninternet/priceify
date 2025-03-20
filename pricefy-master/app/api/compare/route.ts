
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// 🚀 Launch Puppeteer with enhanced settings
const launchBrowser = async () => {
  return await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

// ✅ Amazon Scraper
const scrapeAmazon = async (product: string) => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(product)}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".a-price-whole", { timeout: 10000 });

    const price = await page.evaluate(() => {
      const element = document.querySelector(".a-price-whole");
      return element ? element.textContent?.trim() || "N/A" : "N/A";
    });

    await browser.close();
    return { site: "Amazon", price };
  } catch {
    await browser.close();
    return { site: "Amazon", price: "Error fetching price" };
  }
};

// ✅ Flipkart Scraper
const scrapeFlipkart = async (product: string) => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(product)}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".Nx9bqj._4b5DiR", { timeout: 10000 });

    const price = await page.evaluate(() => {
      const element = document.querySelector(".Nx9bqj._4b5DiR");
      return element ? element.textContent?.trim() || "N/A" : "N/A";
    });
    

    await browser.close();
    return { site: "Flipkart", price };
  } catch {
    await browser.close();
    return { site: "Flipkart", price: "Error fetching price" };
  }
};

// ✅ Zepto Scraper
const scrapeZepto = async (product: string) => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const url = `https://www.zeptonow.com/search?query=${encodeURIComponent(product)}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[data-testid="product-card-price"]', { timeout: 10000 });

    
    const price = await page.evaluate(() => {
        const element = document.querySelector('[data-testid="product-card-price"]');
      return element ? element.textContent?.trim() || "N/A" : "N/A";
    });

    await browser.close();
    return { site: "Zepto", price };
  } catch {
    await browser.close();
    return { site: "Zepto", price: "Error fetching price" };
  }
};

// ✅ Vijay Sales Scraper
const scrapeVijaySales = async (product: string) => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  const url = `https://www.vijaysales.com/search/${encodeURIComponent(product)}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".price", { timeout: 10000 });

    const price = await page.evaluate(() => {
      const element = document.querySelector(".price");
      return element ? element.textContent?.trim() || "N/A" : "N/A";
    });

    await browser.close();
    return { site: "Vijay Sales", price };
  } catch {
    await browser.close();
    return { site: "Vijay Sales", price: "Error fetching price" };
  }
};

  
// ✅ Blinkit Scraper
const scrapeBlinkit = async (product: string) => {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    const url = `https://blinkit.com/s/?q=${encodeURIComponent(product)}`;
  
    try {
      // Use user-agent to avoid bot detection
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
      );
  
      await page.goto(url, { waitUntil: "networkidle2" });
  
      // Updated selector with both classes
      await page.waitForSelector(".tw-text-200.tw-font-semibold", { timeout: 10000 });
  
      const price = await page.evaluate(() => {
        const element = document.querySelector(".tw-text-200.tw-font-semibold");
        return element ? element.textContent?.trim() || "N/A" : "N/A";
      });
  
      await browser.close();
      return { site: "Blinkit", price };
    } catch (err) {
      console.error("Blinkit Error:", err);
      await browser.close();
      return { site: "Blinkit", price: "Error fetching price" };
    }
  };
  

// ✅ JioMart Scraper
const scrapeJioMart = async (product: string) => {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    const url = `https://www.jiomart.com/search/${encodeURIComponent(product)}`;
  
    try {
      // Use user-agent to avoid bot detection
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
      );
  
      await page.goto(url, { waitUntil: "networkidle2" });
  
      // Corrected selector with both classes
      await page.waitForSelector(".jm-heading-xxs.jm-mb-xxs", { timeout: 10000 });
  
      const price = await page.evaluate(() => {
        const element = document.querySelector(".jm-heading-xxs.jm-mb-xxs");
        return element ? element.textContent?.trim() || "N/A" : "N/A";
      });
  
      await browser.close();
      return { site: "JioMart", price };
    } catch (err) {
      console.error("JioMart Error:", err);
      await browser.close();
      return { site: "JioMart", price: "Error fetching price" };
    }
  };
  


// ✅ API handler
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const product = searchParams.get("product");

  if (!product) {
    return NextResponse.json(
      { error: "Product name is required" },
      { status: 400 }
    );
  }

  try {
    const results = await Promise.all([
      scrapeAmazon(product),
      scrapeFlipkart(product),
      scrapeZepto(product),
      scrapeVijaySales(product),
      scrapeBlinkit(product),
      scrapeJioMart(product),
    ]);

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    );
  }
}