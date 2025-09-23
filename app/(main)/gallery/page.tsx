"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ConstructionWrapper from "@/components/ConstructionWrapper"
import { CONSTRUCTION_CONFIG } from "@/lib/construction-config"

const galleryImages = [
  {
    id: 1,
    src: "/api/placeholder/400/300",
    alt: "Farmers collaborating on harvest",
    category: "Farmers",
    title: "Collaborative Harvest"
  },
  {
    id: 2,
    src: "/api/placeholder/400/300",
    alt: "Fresh produce at market",
    category: "Products",
    title: "Fresh Market Produce"
  },
  {
    id: 3,
    src: "/api/placeholder/400/300",
    alt: "Technology in agriculture",
    category: "Technology",
    title: "Digital Agriculture"
  },
  {
    id: 4,
    src: "/api/placeholder/400/300",
    alt: "Buyer meeting with farmers",
    category: "Community",
    title: "Building Connections"
  },
  {
    id: 5,
    src: "/api/placeholder/400/300",
    alt: "Sustainable farming practices",
    category: "Sustainability",
    title: "Sustainable Practices"
  },
  {
    id: 6,
    src: "/api/placeholder/400/300",
    alt: "CropLink platform interface",
    category: "Technology",
    title: "Platform Interface"
  }
]

const categories = ["All", "Farmers", "Products", "Technology", "Community", "Sustainability"]

function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#28B4A3] to-[#0D8B7C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Capturing moments of agricultural transformation across Cameroon
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-[#28B4A3] hover:bg-[#0D8B7C]" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No images found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <ConstructionWrapper
      isUnderConstruction={CONSTRUCTION_CONFIG.gallery}
      title="Gallery Coming Soon"
      description="We're curating an amazing collection of photos showcasing agricultural transformation across Cameroon."
      features={[
        "High-quality photos of farming activities",
        "Success stories from our community",
        "Technology in action",
        "Sustainable farming practices"
      ]}
    >
      <GalleryContent />
    </ConstructionWrapper>
  )
}
