import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Shield, Award, Truck } from "lucide-react";
import Footer from "../components/Footer";



// Simple TransparentNavbar Component
function TransparentNavbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">ShoeStore</div>
        <div className="flex gap-6 text-white">
          <a href="/men" className="hover:text-[#00B894] transition-colors">Men</a>
          <a href="/women" className="hover:text-[#00B894] transition-colors">Women</a>
          <a href="/products" className="hover:text-[#00B894] transition-colors">Products</a>
          <a href="/about" className="hover:text-[#00B894] transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "New Colors of Comfort",
      subtitle: "Discover our latest collection",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600",
      buttonText: "Shop Men",
      buttonLink: "/men",
    },
    {
      id: 2,
      title: "100% Chance of Comfort",
      subtitle: "Weather-ready shoes for every season",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600",
      buttonText: "Shop Women",
      buttonLink: "/women",
    },
    {
      id: 3,
      title: "Unstoppable Protection",
      subtitle: "Built to handle anything nature throws at you",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1600",
      buttonText: "Shop Collection",
      buttonLink: "/products",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <TransparentNavbar />
      <div className="w-full bg-[#ECE9E2]">
        {/* Hero Slider */}
        <div className="relative w-full h-[600px] overflow-hidden bg-[#2D3436]">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full h-full relative flex items-center justify-center"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                <div className="relative z-10 text-center text-white px-4 animate-fadeIn">
                  <p className="text-lg md:text-xl font-medium mb-2 tracking-wide opacity-0 animate-slideDown" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    {slide.title}
                  </h1>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-white text-[#2D3436] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#00B894] hover:text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 opacity-0 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all z-20 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all z-20 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>


        {/* Featured Collections */}
        <div className="w-full bg-[#ECE9E2] py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 
              id="collections-title"
              data-animate
              className={`text-3xl font-bold text-[#2D3436] text-center mb-12 transition-all duration-1000 ${
                isVisible["collections-title"] 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              Featured Collections
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
                  title: "Classic Sneakers",
                  desc: "Everyday comfort",
                  price: "Rs 12,500"
                },
                {
                  img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600",
                  title: "Running Shoes",
                  desc: "Performance ready",
                  price: "Rs 15,000"
                },
                {
                  img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
                  title: "High Tops",
                  desc: "Elevated style",
                  price: "Rs 13,800"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  id={`collection-${index}`}
                  data-animate
                  className={`group cursor-pointer transition-all duration-700 ${
                    isVisible[`collection-${index}`]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2D3436] mb-1 group-hover:text-[#00B894] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#636E72] mb-2">{item.desc}</p>
                  <p className="text-[#00B894] font-bold text-lg group-hover:scale-110 inline-block transition-transform duration-300">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        

        {/* About Our Quality Section */}
        <div className="w-full bg-[#ECE9E2] py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                id="about-content"
                data-animate
                className={`transition-all duration-1000 ${
                  isVisible["about-content"]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-[#00B894] animate-pulse" />
                  <span className="text-[#00B894] font-semibold uppercase text-sm tracking-wider">
                    About Us
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6 leading-tight">
                  Premium Quality,<br />
                  Unmatched Comfort<br />
                  and Style
                </h2>

                <p className="text-[#636E72] text-lg leading-relaxed mb-8">
                  We specialize in providing top-quality footwear to elevate your 
                  lifestyle. Our mission is to ensure comfort and confidence with 
                  reliable, innovative, and stylish shoes designed for every occasion.
                </p>

                <a
                  href="/about"
                  className="inline-block bg-[#00B894] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00A383] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
                >
                  Learn More
                </a>

                <div className="mt-12 flex items-center gap-3">
                  <div className="bg-[#00B894] text-white px-6 py-3 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-3xl font-bold">10+</span>
                  </div>
                  <p className="text-[#636E72] font-medium">
                    We Have More Than 10+ Years of<br />
                    Premium Footwear Experience
                  </p>
                </div>
              </div>

              <div 
                id="about-images"
                data-animate
                className={`relative transition-all duration-1000 delay-300 ${
                  isVisible["about-images"]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800"
                      alt="Shoe craftsmanship"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
                      alt="Quality materials"
                      className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2 duration-500 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1520256862855-398228c41684?w=400"
                      alt="Comfort technology"
                      className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Floating decorations */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#00B894] rounded-full opacity-20 animate-bounce pointer-events-none"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00B894] rounded-full opacity-10 animate-pulse pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer/>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
      `}</style>
    </>
  );}