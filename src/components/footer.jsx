import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2D3436] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">HypeWalk</h3>
            <p className="text-[#B2BEC3] text-sm leading-relaxed mb-6">
              Premium footwear designed for comfort and style. We bring you the latest trends in sneakers, running shoes, and lifestyle footwear.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00B894] mt-1 flex-shrink-0" />
                <p className="text-[#B2BEC3] text-sm">
                  123 Fashion Street, Downtown<br />
                  Colombo, Sri Lanka 00100
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#00B894] flex-shrink-0" />
                <a href="tel:+94112345678" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  +94 11 234 5678
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#00B894] flex-shrink-0" />
                <a href="mailto:info@hypewalk.com" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  info@hypewalk.com
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/men" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Men's Shoes
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Women's Shoes
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#B2BEC3] hover:text-[#00B894] transition text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h4 className="text-lg font-semibold mb-2">Stay in the Loop</h4>
            <p className="text-[#B2BEC3] text-sm mb-4">
              Get the latest updates on new releases, exclusive offers, and more.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-[#2D3436] text-sm focus:outline-none focus:ring-2 focus:ring-[#00B894]"
              />
              <button className="bg-[#00B894] hover:bg-[#00A383] px-6 py-3 rounded-lg font-semibold transition-all text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-[#00B894] rounded-full transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-[#00B894] rounded-full transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-[#00B894] rounded-full transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-[#00B894] rounded-full transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#B2BEC3] text-sm">
              © 2025 HypeWalk. All rights reserved.
            </p>
            
            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <span className="text-[#B2BEC3] text-xs">We Accept:</span>
              <div className="flex gap-2">
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-[#2D3436]">VISA</div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-[#2D3436]">Mastercard</div>
                <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-[#2D3436]">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
