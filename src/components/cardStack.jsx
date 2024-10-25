"use client";
import { useState, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';

const CardStack = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [interval, setIntervalTime] = useState(3000); // 3 seconds default
  
  const cards = [
    {
      id: 1,
      image: `${basePath}/images/1st.jpg`,
      title: "1st Anniversary",
      date: "2022"
    },
    {
      id: 2,
      image: `${basePath}/images/2nd.jpg`,
      title: "2nd Anniversary",
      date: "2023"
    },
    {
      id: 3,
      image: `${basePath}/images/3rd.jpg`,
      title: "3rd Anniversary!",
      date: "2024"
    },
  ];

  const nextCard = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }, [cards.length]);

  // Auto-play effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(nextCard, interval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, interval, nextCard]);

  // Handle manual click
  const handleClick = () => {
    nextCard();
    // Optionally pause autoplay on manual interaction
    setIsPlaying(false);
  };

  // Calculate visible cards (show max 4 cards at a time)
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < Math.min(4, cards.length); i++) {
      const index = (currentIndex + i) % cards.length;
      visibleCards.push(cards[index]);
    }
    return visibleCards;
  };

  return (
    <div className="relative w-80 mx-auto ">
      <div className="relative h-[450px] w-full perspective-1000">
        {getVisibleCards().map((card, index) => {
          const isTop = index === 0;
          const offset = index * 10;
          const scale = 1 - (index * 0.05);
          const rotation = index * 2;
          const opacity = 1 - (index * 0.15);
          
          return (
            <div
              key={card.id}
              onClick={isTop ? handleClick : undefined}
              className={`
                absolute left-0 right-0 w-full transition-all duration-1000 ease-out shadow-xl
                ${isTop ? 'cursor-pointer hover:-translate-y-2' : ''}
              `}
              style={{
                transform: `
                  translateY(${offset}px)
                  scale(${scale})
                  rotate(${rotation}deg)
                `,
                zIndex: cards.length - index,
                opacity: opacity,
                transformOrigin: 'center top',
              }}
            >
              <div className={`
                relative bg-white rounded-xl overflow-hidden
                ${index > 0 ? 'ring-2 ring-white' : ''}
                shadow-[0_${4 + index * 4}px_${8 + index * 4}px_rgba(0,0,0,0.${15 + index * 5})]
              `}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-100 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
                  <h3 className="text-white text-xl font-bold">{card.title}</h3>
                  <p className="text-white/80">{card.date}</p>
                </div>
                <div className="absolute inset-0 border-2 border-white/10 rounded-xl"></div>
              </div>
              
              {index > 0 && Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-white rounded-xl -z-10"
                  style={{
                    transform: `translateY(${(i + 1) * 2}px)`,
                    opacity: 0.5 - i * 0.1,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 mt-40">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
        
        <div className="flex items-center gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${(index === currentIndex) ? 'bg-white scale-125' : 'bg-white/50'}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
