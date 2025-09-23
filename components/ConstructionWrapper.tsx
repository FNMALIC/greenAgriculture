"use client"

import { Construction, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ConstructionWrapperProps {
  children: React.ReactNode
  isUnderConstruction?: boolean
  title?: string
  description?: string
  features?: string[]
}

export default function ConstructionWrapper({ 
  children, 
  isUnderConstruction = false,
  title = "Page Coming Soon",
  description = "We're working hard to bring you an amazing experience.",
  features = []
}: ConstructionWrapperProps) {
  if (!isUnderConstruction) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Construction className="h-24 w-24 text-[#28B4A3] mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {description}
          </p>
          
          <div className="flex items-center justify-center text-[#28B4A3] mb-8">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-medium">Under Construction</span>
          </div>
          
          {features.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">What to expect:</h3>
              <ul className="text-left text-gray-600 space-y-2">
                {features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Want to be notified when we launch?
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-[#28B4A3] hover:bg-[#0D8B7C]">
                <Mail className="h-4 w-4 mr-2" />
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
