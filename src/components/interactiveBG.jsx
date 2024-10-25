"use client";
import React, { useState, useEffect } from "react";

const InteractiveBackground = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

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

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reduced from 300ms to 200ms
  };

  return (
    <div className="relative w-full min-h-screen" onClick={handleClick}>
      {/* Base gradient layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-500 to-yellow-200" />
      
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
    </div>
  );
};

export default InteractiveBackground;
