import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function TransparentNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold transition ${
              isScrolled ? "text-[#2D3436]" : "text-white"
            } hover:text-[#00B894]`}
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
                  : isScrolled
                  ? "text-[#636E72] hover:text-[#00B894]"
                  : "text-white hover:text-[#00B894]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/men"
              className={`font-medium transition ${
                isActive("/men")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : isScrolled
                  ? "text-[#636E72] hover:text-[#00B894]"
                  : "text-white hover:text-[#00B894]"
              }`}
            >
              Men
            </Link>
            <Link
              to="/women"
              className={`font-medium transition ${
                isActive("/women")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : isScrolled
                  ? "text-[#636E72] hover:text-[#00B894]"
                  : "text-white hover:text-[#00B894]"
              }`}
            >
              Women
            </Link>
            <Link
              to="/about"
              className={`font-medium transition ${
                isActive("/about")
                  ? "text-[#00B894] border-b-2 border-[#00B894] pb-1"
                  : isScrolled
                  ? "text-[#636E72] hover:text-[#00B894]"
                  : "text-white hover:text-[#00B894]"
              }`}
            >
              About
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className={`p-2 rounded-full transition ${
                isScrolled ? "hover:bg-[#FAFAFA]" : "hover:bg-white/20"
              }`}
            >
              <ShoppingCart
                className={`w-6 h-6 transition ${
                  isScrolled ? "text-[#2D3436]" : "text-white"
                }`}
              />
            </Link>
            <Link
              to="/login"
              className={`p-2 rounded-full transition ${
                isScrolled ? "hover:bg-[#FAFAFA]" : "hover:bg-white/20"
              }`}
            >
              <User
                className={`w-6 h-6 transition ${
                  isScrolled ? "text-[#2D3436]" : "text-white"
                }`}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full transition ${
                isScrolled ? "hover:bg-[#FAFAFA]" : "hover:bg-white/20"
              }`}
            >
              {isMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    isScrolled ? "text-[#2D3436]" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    isScrolled ? "text-[#2D3436]" : "text-white"
                  }`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 border-t pt-4 ${
              isScrolled ? "border-[#DFE6E9]" : "border-white/20"
            }`}
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition ${
                  isActive("/")
                    ? "text-[#00B894]"
                    : isScrolled
                    ? "text-[#636E72] hover:text-[#00B894]"
                    : "text-white hover:text-[#00B894]"
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
                    : isScrolled
                    ? "text-[#636E72] hover:text-[#00B894]"
                    : "text-white hover:text-[#00B894]"
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
                    : isScrolled
                    ? "text-[#636E72] hover:text-[#00B894]"
                    : "text-white hover:text-[#00B894]"
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
                    : isScrolled
                    ? "text-[#636E72] hover:text-[#00B894]"
                    : "text-white hover:text-[#00B894]"
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
