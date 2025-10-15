import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-[#2D3436] hover:text-[#00B894] transition"
          >
            HypeWalk
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition ${
                isActive("/")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : "text-[#636E72] hover:text-[#00B894]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/men"
              className={`font-medium transition ${
                isActive("/men")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : "text-[#636E72] hover:text-[#00B894]"
              }`}
            >
              Men
            </Link>
            <Link
              to="/women"
              className={`font-medium transition ${
                isActive("/women")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : "text-[#636E72] hover:text-[#00B894]"
              }`}
            >
              Women
            </Link>
            <Link
              to="/about"
              className={`font-medium transition ${
                isActive("/about")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : "text-[#636E72] hover:text-[#00B894]"
              }`}
            >
              About
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="p-2 hover:bg-[#FAFAFA] rounded-full transition"
            >
              <ShoppingCart className="w-6 h-6 text-[#2D3436]" />
            </Link>
            <Link
              to="/login"
              className="p-2 hover:bg-[#FAFAFA] rounded-full transition"
            >
              <User className="w-6 h-6 text-[#2D3436]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-[#FAFAFA] rounded-full transition"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#2D3436]" />
              ) : (
                <Menu className="w-6 h-6 text-[#2D3436]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#DFE6E9] pt-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition ${
                  isActive("/")
                    ? "text-[#00B894]"
                    : "text-[#636E72] hover:text-[#00B894]"
                }`}
              >
                Home
              </Link>
              <Link
                to="/men"
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition ${
                  isActive("/men")
                    ? "text-[#00B894]"
                    : "text-[#636E72] hover:text-[#00B894]"
                }`}
              >
                Men
              </Link>
              <Link
                to="/women"
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition ${
                  isActive("/women")
                    ? "text-[#00B894]"
                    : "text-[#636E72] hover:text-[#00B894]"
                }`}
              >
                Women
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition ${
                  isActive("/about")
                    ? "text-[#00B894]"
                    : "text-[#636E72] hover:text-[#00B894]"
                }`}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
