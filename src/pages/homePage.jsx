import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shield, Award, Truck } from "lucide-react";
import Footer from "../components/Footer";
import TransparentNavbar from "../components/TransparentNavbar";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

                <div className="relative z-10 text-center text-white px-4">
                  <p className="text-lg md:text-xl font-medium mb-2 tracking-wide">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-8">
                    {slide.title}
                  </h1>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-white text-[#2D3436] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#00B894] hover:text-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all z-20"
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
            <h2 className="text-3xl font-bold text-[#2D3436] text-center mb-12">
              Featured Collections
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group cursor-pointer">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
                    alt="Sneakers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3436] mb-1">
                  Classic Sneakers
                </h3>
                <p className="text-[#636E72] mb-2">Everyday comfort</p>
                <p className="text-[#00B894] font-bold text-lg">Rs 12,500</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600"
                    alt="Running Shoes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3436] mb-1">
                  Running Shoes
                </h3>
                <p className="text-[#636E72] mb-2">Performance ready</p>
                <p className="text-[#00B894] font-bold text-lg">Rs 15,000</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600"
                    alt="High Tops"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3436] mb-1">
                  High Tops
                </h3>
                <p className="text-[#636E72] mb-2">Elevated style</p>
                <p className="text-[#00B894] font-bold text-lg">Rs 13,800</p>
              </div>
            </div>
          </div>
        </div>


        

        {/* About Our Quality Section */}
        <div className="w-full bg-[#ECE9E2] py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-[#00B894]" />
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
                  className="inline-block bg-[#00B894] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00A383] transition-all shadow-lg hover:shadow-xl"
                >
                  Learn More
                </a>

                <div className="mt-12 flex items-center gap-3">
                  <div className="bg-[#00B894] text-white px-6 py-3 rounded-lg">
                    <span className="text-3xl font-bold">10+</span>
                  </div>
                  <p className="text-[#636E72] font-medium">
                    We Have More Than 10+ Years of<br />
                    Premium Footwear Experience
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800"
                      alt="Shoe craftsmanship"
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"
                      alt="Quality materials"
                      className="w-full h-72 object-cover"
                    />
                  </div>

                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1520256862855-398228c41684?w=400"
                      alt="Comfort technology"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </>
  );
}
