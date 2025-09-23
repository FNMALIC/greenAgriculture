"use client"

import ConstructionWrapper from "@/components/ConstructionWrapper"
import { CONSTRUCTION_CONFIG } from "@/lib/construction-config"

function MarketplaceContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#28B4A3] to-[#0D8B7C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CropLink Marketplace</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Connect directly with farmers and buyers across Cameroon
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Marketplace content would go here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Fresh Tomatoes</h3>
            <p className="text-gray-600 mb-4">Premium quality tomatoes from local farmers</p>
            <div className="flex justify-between items-center">
              <span className="text-[#28B4A3] font-bold">500 FCFA/kg</span>
              <span className="text-sm text-gray-500">Available: 200kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <ConstructionWrapper
      isUnderConstruction={CONSTRUCTION_CONFIG.marketplace}
      title="Marketplace Coming Soon"
      description="We're working hard to bring you an amazing marketplace experience where farmers and buyers can connect directly."
      features={[
        "Direct connection between farmers and buyers",
        "Real-time crop availability and pricing",
        "Secure payment and delivery management",
        "AI-powered market insights"
      ]}
    >
      <MarketplaceContent />
    </ConstructionWrapper>
  )
}
