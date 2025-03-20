import { ExternalLink, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { searchProducts } from "@/lib/product-api"

export async function SearchResults({ query }: { query: string }) {
  const products = await searchProducts(query)

  if (products.length === 0) {
    return (
      <div className="text-center p-12">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-muted-foreground">Try searching with different keywords or browse our categories</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
              {product.bestPrice && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 whitespace-nowrap ml-2">
                  Best Price
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="aspect-square relative mb-4 bg-slate-50 rounded-md overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {product.prices.map((price) => (
                  <div key={price.store} className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">{price.store}</div>
                    <div className="font-semibold text-lg">Rs.{price.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground line-clamp-3">{product.description}</div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button asChild className="w-full">
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Best Deal
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

