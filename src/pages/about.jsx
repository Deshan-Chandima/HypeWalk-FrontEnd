import { useState, useEffect, useRef } from "react";
import { Shield, Award, Users, TrendingUp, Heart, Zap, Target, Globe } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";






export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

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

  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "Every pair undergoes rigorous quality checks to ensure premium craftsmanship and durability."
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Your comfort and satisfaction drive everything we do. We're here to serve you better every day."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace cutting-edge technology and design to bring you the most advanced footwear solutions."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to reducing our environmental footprint through eco-friendly materials and practices."
    }
  ];

  const stats = [
    { number: "10+", label: "Years of Excellence" },
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Premium Products" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const milestones = [
    {
      year: "2014",
      title: "The Beginning",
      description: "Started as a small local shoe shop with a passion for quality footwear and customer service."
    },
    {
      year: "2017",
      title: "Expansion",
      description: "Opened multiple locations and launched our online store to serve customers nationwide."
    },
    {
      year: "2020",
      title: "Innovation Hub",
      description: "Partnered with leading brands to bring exclusive designs and cutting-edge comfort technology."
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Embracing sustainable practices and digital innovation to shape the future of footwear retail."
    }
  ];
  

  return (
    <>
      <Navbar/>
      <div className="w-full bg-[#ECE9E2]">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gradient-to-br from-[#2D3436] via-[#636E72] to-[#2D3436] overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-[#00B894] rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#00B894] rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
            <div className="opacity-0 animate-fadeInUp" style={{ animationFillMode: 'forwards' }}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Crafting comfort and style for over a decade. We're more than just shoes—we're your journey's companion.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div
            id="mission"
            data-animate
            className={`bg-white rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-1000 ${
              isVisible["mission"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <Target className="w-12 h-12 text-[#00B894]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] text-center mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-[#636E72] text-center max-w-4xl mx-auto leading-relaxed">
              To provide premium quality footwear that combines innovative design, exceptional comfort, 
              and timeless style. We believe everyone deserves shoes that not only look great but feel 
              amazing, empowering you to walk confidently through every moment of your life. Our commitment 
              extends beyond products—we're dedicated to building lasting relationships with our customers 
              and contributing positively to our communities.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#2D3436] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  id={`stat-${index}`}
                  data-animate
                  className={`text-center transition-all duration-700 ${
                    isVisible[`stat-${index}`]
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#00B894] mb-2 hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2
            id="values-title"
            data-animate
            className={`text-4xl md:text-5xl font-bold text-[#2D3436] text-center mb-16 transition-all duration-1000 ${
              isVisible["values-title"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  id={`value-${index}`}
                  data-animate
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    isVisible[`value-${index}`]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-[#00B894] w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D3436] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[#636E72] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="bg-gradient-to-b from-white to-[#ECE9E2] py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2
              id="journey-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold text-[#2D3436] text-center mb-16 transition-all duration-1000 ${
                isVisible["journey-title"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Our Journey
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00B894] hidden md:block"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  id={`milestone-${index}`}
                  data-animate
                  className={`mb-12 transition-all duration-1000 ${
                    isVisible[`milestone-${index}`]
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                      ? "opacity-0 -translate-x-20"
                      : "opacity-0 translate-x-20"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center mb-4 md:mb-0`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                        <h3 className="text-3xl font-bold text-[#00B894] mb-2">
                          {milestone.year}
                        </h3>
                        <h4 className="text-xl font-bold text-[#2D3436] mb-3">
                          {milestone.title}
                        </h4>
                        <p className="text-[#636E72]">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="w-full md:w-2/12 flex justify-center">
                      <div className="w-6 h-6 bg-[#00B894] rounded-full border-4 border-white shadow-lg hover:scale-125 transition-transform"></div>
                    </div>

                    <div className="w-full md:w-5/12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div
            id="team-section"
            data-animate
            className={`text-center transition-all duration-1000 ${
              isVisible["team-section"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <Users className="w-16 h-16 text-[#00B894] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6">
              Built by People, For People
            </h2>
            <p className="text-lg text-[#636E72] max-w-3xl mx-auto mb-8 leading-relaxed">
              Our dedicated team of footwear experts, designers, and customer service professionals 
              work tirelessly to bring you the best shopping experience. We're passionate about shoes, 
              and even more passionate about serving you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all hover:scale-105">
                <span className="text-[#2D3436] font-semibold">Expert Stylists</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all hover:scale-105">
                <span className="text-[#2D3436] font-semibold">Quality Specialists</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all hover:scale-105">
                <span className="text-[#2D3436] font-semibold">Customer Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#00B894] to-[#00A383] py-16">
          <div
            id="cta-section"
            data-animate
            className={`max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${
              isVisible["cta-section"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experience the difference of premium quality and exceptional service. 
              Your perfect pair awaits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/men"
                className="bg-white text-[#00B894] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2D3436] hover:text-white transition-all hover:scale-105 hover:shadow-2xl"
              >
                Shop Men's
              </a>
              <a
                href="/women"
                className="bg-[#2D3436] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#00B894] transition-all hover:scale-105 hover:shadow-2xl"
              >
                Shop Women's
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </>
  );
}