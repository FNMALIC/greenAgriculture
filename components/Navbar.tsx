"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">CropLink</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-teal-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-teal-primary transition-colors">
                How It Works
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-teal-primary transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-teal-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-teal-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-teal-primary text-white px-4 py-2 rounded-lg hover:bg-teal-secondary transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-teal-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="#features"
              className="block px-3 py-2 text-gray-600 hover:text-teal-primary"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 text-gray-600 hover:text-teal-primary"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#about"
              className="block px-3 py-2 text-gray-600 hover:text-teal-primary"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-gray-600 hover:text-teal-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t pt-4">
              <Link
                href="/login"
                className="block px-3 py-2 text-gray-600 hover:text-teal-primary"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block mx-3 mt-2 bg-teal-primary text-white px-4 py-2 rounded-lg text-center hover:bg-teal-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
