import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect,{" "}
              <span className="text-teal-primary">Collaborate</span>,{" "}
              <span className="text-teal-secondary">Grow</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Transform agriculture through technology. CropLink connects smallholder farmers 
              with buyers, enables collaborative fulfillment, and provides AI-driven market 
              insights for sustainable farming in Cameroon.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-teal-primary text-white font-medium rounded-lg hover:bg-teal-secondary transition-colors group"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-teal-primary text-teal-primary font-medium rounded-lg hover:bg-teal-primary hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-teal-primary" />
                </div>
                <div className="font-heading font-bold text-2xl text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-teal-primary" />
                </div>
                <div className="font-heading font-bold text-2xl text-gray-900">40%</div>
                <div className="text-sm text-gray-600">Income Increase</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-teal-primary" />
                </div>
                <div className="font-heading font-bold text-2xl text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Secure Transactions</div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <div className="w-16 h-16 bg-teal-primary rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-gray-800 mb-2">
                      Agricultural Innovation
                    </h3>
                    <p className="text-gray-600">
                      Empowering farmers with technology for sustainable growth
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-primary rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal-secondary rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
