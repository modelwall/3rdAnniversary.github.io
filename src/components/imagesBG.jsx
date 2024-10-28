"use client";
import React, { useState, useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const ImagesBackground = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    `${basePath}/images/1.jpg`,
    `${basePath}/images/2.jpeg`,
    `${basePath}/images/5.png`,
    `${basePath}/images/7.jpg`,
    `${basePath}/images/8.jpg`,
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const docEl = document.documentElement;
      const scrollWidth = docEl.scrollWidth;
      const scrollHeight = docEl.scrollHeight;
      
      const x = ((e.pageX) / scrollWidth) * 100;
      const y = ((e.pageY) / scrollHeight) * 100;
      
      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    // Change image on click
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full min-h-screen" onClick={handleClick}>
      {/* Image backgrounds with crossfade */}
      {images.map((img, index) => (
        <div
          key={img}
          className="fixed inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentImageIndex === index ? 1 : 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
      ))}
      
      {/* Heart gradient overlay */}
      <div 
        className="fixed inset-0"
        style={{
          mask: `radial-gradient(
            closest-side,
            black,
            transparent
          ),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' width='512' height='512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: `0px, ${isClicked ? '120px' : '150px'}`,
          maskPosition: `${mousePosition.x}% ${mousePosition.y}%, ${mousePosition.x}% ${mousePosition.y}%`,
          maskRepeat: 'no-repeat',
          WebkitMask: `radial-gradient(
            closest-side,
            black,
            transparent
          ),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' width='512' height='512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z' fill='black'/%3E%3C/svg%3E")`,
          WebkitMaskSize: `0px, ${isClicked ? '120px' : '150px'}`,
          WebkitMaskPosition: `${mousePosition.x}% ${mousePosition.y}%, ${mousePosition.x}% ${mousePosition.y}%`,
          WebkitMaskRepeat: 'no-repeat',
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(236, 72, 153, 0.7) 0%,
            rgba(250, 204, 21, 0.5) 40%,
            rgba(236, 72, 153, 0.2) 100%
          )`,
          transform: isClicked ? 'scale(0.85)' : 'scale(1)',
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          transition: 'transform 0.1s cubic-bezier(0.2, 0, 0.4, 1), mask-size 0.1s cubic-bezier(0.2, 0, 0.4, 1), -webkit-mask-size 0.1s cubic-bezier(0.2, 0, 0.4, 1)',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4">
        {children}
      </div>

      {/* Small floating heart at cursor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
          }}
        />
      </div>
      
      {/* Image counter (optional - remove if not needed) */}
      <div className="fixed bottom-4 right-4 z-20 text-white bg-black/50 px-2 py-1 rounded">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImagesBackground;
