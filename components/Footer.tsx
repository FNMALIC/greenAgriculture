import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-teal-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">CropLink</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming agriculture through technology. Connect, collaborate, and grow with CropLink.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/farmers" className="text-gray-400 hover:text-white transition-colors">
                  For Farmers
                </Link>
              </li>
              <li>
                <Link href="/buyers" className="text-gray-400 hover:text-white transition-colors">
                  For Buyers
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-400 hover:text-white transition-colors">
                  Market Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-primary" />
                <span className="text-gray-400">contact@croplink.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-primary" />
                <span className="text-gray-400">+237 697122421</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-primary mt-0.5" />
                <span className="text-gray-400">
                  Douala, Cameroon<br />
                  Central Africa
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CropLink. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
