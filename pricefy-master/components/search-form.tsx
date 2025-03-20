"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full max-w-3xl mx-auto items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products (e.g., electronics, jewelry, clothing)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 py-6 text-base"
          />
        </div>
        <Button type="submit" size="lg">
          Search
        </Button>
      </div>
    </form>
  )
}

