"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  BarChart,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  Star,
  BarChart2,
  Zap,
  Menu,
  X,
} from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Function to handle intersection observations
  const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        if (entry.target === statsRef.current) {
          startCounters();
        }
        // Add a visible class to the target element
        entry.target.classList.add("is-visible");
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    setIsVisible(true);

    // Create the Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px", // Trigger slightly before element comes into view
    });

    // Observe multiple sections
    const elements = [statsRef.current, servicesRef.current, testimonialsRef.current, ctaRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const startCounters = () => {
    // Animate counters
    const maxRevenue = 7000000;
    const maxClients = 40;
    const duration = 2500; // 2.5 seconds for smoother animation
    const interval = 16; // For 60fps animation
    const steps = duration / interval;

    let revenueStep = maxRevenue / steps;
    let clientStep = maxClients / steps;

    const timer = setInterval(() => {
      setRevenue((prev) => {
        const newValue = prev + revenueStep;
        return newValue >= maxRevenue ? maxRevenue : newValue;
      });

      setCounter((prev) => {
        const newValue = prev + clientStep;
        return newValue >= maxClients ? maxClients : newValue;
      });
    }, interval);

    setTimeout(() => clearInterval(timer), duration);
  };

  interface FormatRevenue {
    (value: number): string;
  }

  const formatRevenue: FormatRevenue = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}mil`;
    }
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const services = [
    {
      title: "Market Analysis",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Comprehensive market research and competitor analysis to position your business effectively.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Customer Acquisition",
      icon: <Users className="h-6 w-6" />,
      description: "Data-driven strategies to attract and convert your ideal customers at scale.",
      color: "from-indigo-500 to-purple-400"
    },
    {
      title: "Scaling Solutions",
      icon: <BarChart2 className="h-6 w-6" />,
      description: "Tailored growth frameworks to scale your operations and maximize revenue.",
      color: "from-purple-500 to-pink-400"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with mobile responsiveness */}
        <div className="flex justify-between items-center py-6 mb-8 md:mb-16">
          <div className="flex items-center z-50">
            <div className="bg-white p-2 md:p-3 rounded-xl shadow-md">
              <div className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                 FlowForge
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-gray-600">
            {["Home", "Strategies", "Testimonials", "Contact"].map((item, index) => (
              <div 
                key={index}
                className="font-medium relative group cursor-pointer"
              >
                <span className="hover:text-blue-600 transition-colors">{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
          }`}>
            <div className="flex flex-col space-y-8 text-xl">
              {["Home", "Strategies", "Testimonials", "Contact"].map((item, index) => (
                <div 
                  key={index}
                  className="font-medium text-center cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </div>
              ))}
              <button 
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-md flex items-center justify-center group mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start the flow
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <button className="hidden md:flex bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-md items-center group">
            Start the flow
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Hero Section with enhanced animations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24 items-center">
          <div
            className={`transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            } transition-all duration-1000`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn your
              <span className="text-blue-500 italic font-light relative">
                spark
                <svg className="absolute top-full left-0 w-full h-1" viewBox="0 0 100 3">
                  <path 
                    d="M0,1 Q25,3 50,1 T100,1" 
                    stroke="#3B82F6" 
                    strokeWidth="2" 
                    fill="none" 
                    className="animate-dash"
                  />
                </svg>
              </span> into
              <br className="hidden md:block" />
              <span className="relative inline-block mt-2">
                stream of success
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full animate-pulse"></span>
              </span>
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed">
                FlowForge growth agency helps early-stage
              <br className="hidden md:block" />
              companies turn ideas into scalable business
            </p>

            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 md:px-7 py-3 md:py-4 rounded-full font-medium hover:shadow-lg transition-all flex items-center group animate-bounce" style={{animationDuration: '3s', animationIterationCount: '3'}}>
              Get started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className={`relative overflow-hidden rounded-2xl shadow-lg transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } transition-all duration-1000 delay-300`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 500 300" className="w-full h-full">
                  {/* Animated wave paths with enhanced animations */}
                  <path 
                    d="M0,150 C150,250 350,50 500,150 L500,300 L0,300 Z" 
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="3"
                  >
                    <animate 
                      attributeName="d" 
                      dur="10s"
                      repeatCount="indefinite"
                      values="
                        M0,150 C150,250 350,50 500,150 L500,300 L0,300 Z;
                        M0,150 C150,200 350,100 500,150 L500,300 L0,300 Z;
                        M0,150 C150,250 350,50 500,150 L500,300 L0,300 Z
                      "
                    />
                  </path>
                  <path 
                    d="M0,150 C150,50 350,250 500,150 L500,300 L0,300 Z" 
                    fill="rgba(255, 255, 255, 0.1)"
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="4"
                  >
                    <animate 
                      attributeName="d" 
                      dur="15s"
                      repeatCount="indefinite"
                      values="
                        M0,150 C150,50 350,250 500,150 L500,300 L0,300 Z;
                        M0,150 C150,100 350,200 500,150 L500,300 L0,300 Z;
                        M0,150 C150,50 350,250 500,150 L500,300 L0,300 Z
                      "
                    />
                  </path>
                  <path 
                    d="M0,150 C100,180 200,120 300,180 C400,240 450,120 500,150 L500,300 L0,300 Z" 
                    fill="rgba(99, 102, 241, 0.1)"
                    stroke="rgba(99, 102, 241, 0.6)"
                    strokeWidth="3"
                  >
                    <animate 
                      attributeName="d" 
                      dur="12s"
                      repeatCount="indefinite"
                      values="
                        M0,150 C100,180 200,120 300,180 C400,240 450,120 500,150 L500,300 L0,300 Z;
                        M0,150 C100,150 200,180 300,150 C400,120 450,180 500,150 L500,300 L0,300 Z;
                        M0,150 C100,180 200,120 300,180 C400,240 450,120 500,150 L500,300 L0,300 Z
                      "
                    />
                  </path>
                  
                  {/* Floating particles */}
                  <circle cx="100" cy="100" r="3" fill="white" opacity="0.8">
                    <animate 
                      attributeName="cy" 
                      values="100;80;100" 
                      dur="4s" 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cx" 
                      values="100;110;100" 
                      dur="5s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle cx="200" cy="150" r="2" fill="white" opacity="0.6">
                    <animate 
                      attributeName="cy" 
                      values="150;140;150" 
                      dur="7s" 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cx" 
                      values="200;190;200" 
                      dur="6s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle cx="300" cy="120" r="4" fill="white" opacity="0.7">
                    <animate 
                      attributeName="cy" 
                      values="120;140;120" 
                      dur="8s" 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cx" 
                      values="300;310;300" 
                      dur="9s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                  <circle cx="400" cy="90" r="2" fill="white" opacity="0.5">
                    <animate 
                      attributeName="cy" 
                      values="90;70;90" 
                      dur="6s" 
                      repeatCount="indefinite" 
                    />
                    <animate 
                      attributeName="cx" 
                      values="400;390;400" 
                      dur="7s" 
                      repeatCount="indefinite" 
                    />
                  </circle>
                </svg>
              </div>
              
              {/* Client count overlay with enhanced animation */}
              <div className="absolute top-0 md:top-4 right-4 p-2 md:p-4 text-right z-10 animate-fadeIn">
                <div className="text-3xl md:text-5xl font-bold text-white animate-counting">
                  {Math.floor(counter)}+
                </div>
                <div className="text-blue-200 text-sm md:text-xl">Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section with improved animations */}
        <div ref={statsRef} className="relative mb-20 transition-all duration-1000">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl transform -rotate-1 scale-105 opacity-50"></div>
  <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
    {[
      { 
        icon: <BarChart className="h-5 w-5" />, 
        label: "Generated", 
        value: formatRevenue(revenue),
        delay: "200ms" 
      },
      { 
        icon: <Clock className="h-5 w-5" />, 
        label: "Time", 
        value: "4 week",
        delay: "300ms" 
      },
      { 
        icon: <Award className="h-5 w-5" />, 
        label: "Success", 
        value: "100%",
        delay: "400ms" 
      },
      { 
        icon: <Users className="h-5 w-5" />, 
        label: "Clients", 
        value: `${Math.floor(counter)}+`,
        delay: "500ms" 
      }
    ].map((stat, index) => (
      <div
        key={index}
        className="p-4 sm:p-6 rounded-xl transition-all duration-1000 hover:shadow-md hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 group"
        style={{ transitionDelay: stat.delay }}
      >
        <div className="flex items-center mb-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg text-white mr-3 group-hover:scale-110 transition-transform">
            {stat.icon}
          </div>
          <div className="text-xs md:text-sm font-medium text-gray-500">{stat.label}</div>
        </div>
        <div className="text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {stat.value}
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Services Section with enhanced animations */}
        <div
          ref={servicesRef}
          className="mb-16 opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="mb-12 text-center">
            <h2 className=" text-2xl md:text-3xl font-bold mb-4">Our Growth Strategies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine data-driven insights with creative solutions to deliver measurable results for early-stage companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform relative overflow-hidden`}>
                  {/* Animated background for service icons */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute -inset-4 rounded-full bg-white opacity-50 animate-ping" style={{ animationDuration: '3s' }}></div>
                  </div>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-indigo-600 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials section with animations */}
        <div ref={testimonialsRef} className="mb-20 relative opacity-0 transform translate-y-10 transition-all duration-1000">
          <div className="absolute top-10 left-5 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-10 right-5 w-32 h-32 bg-indigo-100 rounded-full opacity-50 blur-xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          
          <div className="relative">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about our partnership.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "  FlowForge transformed our approach to growth. Their strategies helped us double our customer base in just three months.",
                  author: "Sarah Johnson",
                  company: "TechStart CEO"
                },
                {
                  quote: "Working with   FlowForge was the best decision we made. Their 4-week turnaround time exceeded our expectations.",
                  author: "Michael Chen",
                  company: "Innovate Labs Founder"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-md relative hover:shadow-lg transition-all"
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="absolute top-4 left-4 text-blue-100">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11,7h6a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H13v2h4v2H11V11A4,4,0,0,1,15,7Zm-6,8H9V13H7v2H5V11A4,4,0,0,1,9,7h2v2H9a2,2,0,0,0-2,2v2H9v2H5Z"/>
                    </svg>
                  </div>
                  <div className="ml-6 mt-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 150}ms`, animationDuration: '2s' }} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section with enhanced animations */}
        <div ref={ctaRef} className="relative mb-16 py-16 opacity-0 transform translate-y-10 transition-all duration-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl transform rotate-1 scale-105">
            {/* Animated particles for the CTA background */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full opacity-20 animate-float" style={{ animationDuration: '7s' }}></div>
            <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-white rounded-full opacity-20 animate-float" style={{ animationDuration: '9s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-white rounded-full opacity-20 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          </div>
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white overflow-hidden">
            {/* Radial glow animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
            </div>
            
            <Zap className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-6 text-yellow-300 animate-pulse" style={{ animationDuration: '3s' }} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Growth Journey?</h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-8">
              Schedule a free consultation with our expert team and discover how we can help transform your business.
            </p>
            <button className="bg-white text-indigo-600 hover:text-indigo-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:shadow-lg transition-all flex items-center mx-auto group">
              Book a consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer with improved responsive design */}
        <footer className="py-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  FlowForge
              </div>
              <p className="text-gray-600 text-sm">
                Turning ideas into scalable businesses since 2018.
              </p>
            </div>
            
            {[
              {
                title: "Company",
                links: ["About", "Team", "Careers", "Contact"]
              },
              {
                title: "Services",
                links: ["Growth Strategy", "Market Analysis", "Customer Acquisition", "Scaling Solutions"]
              },
              {
                title: "Resources",
                links: ["Blog", "Case Studies", "Guides", "FAQ"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i} className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer text-sm">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()}   SalaTech. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Add global animations */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 1000;
          }
        }
        
        .animate-dash {
          stroke-dasharray: 100;
          animation: dash 10s linear infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(10px); }
          75% { transform: translateY(5px) translateX(5px); }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes counting {
          from { opacity: 0.5; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-counting {
          animation: counting 0.5s ease-out;
        }
        
        .is-visible {
          opacity: 1 !important;
          transform: translate(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Home;