import { useState } from 'react';

const TextRevealCard = ({ 
  title = "Card Title",
  description = "This is the hidden description that will be revealed when you click the card.",
  backgroundColor = "bg-indigo-500",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative overflow-hidden rounded-xl ring-4 ring-white cursor-pointer
        transition-all duration-500 ease-out
        ${isExpanded ? 'h-96' : 'h-64'}
        ${backgroundColor}
        hover:shadow-2xl
        group
      `}
    >
      {/* Content Container */}
      <div className={`
        relative h-full w-full p-6
        flex flex-col items-center justify-center
        text-center
        transition-all duration-500
      `}>
        {/* Title */}
        <div className={`
          transition-all duration-500
          ${isExpanded 
            ? 'opacity-0 translate-y-[-20px] absolute'
            : 'opacity-100 translate-y-0'
          }
        `}>
          <h3 className="text-2xl font-[family-name:var(--font-mitr-reg)] font-bold text-white">{title}</h3>
          <h3 className="font-[family-name:var(--font-mitr-reg)] font text-gray-300">ลองกดเปิดดูซิ</h3>
        </div>

        {/* Description */}
        <div className={`
          text-white/90 max-w-prose px-4
          transition-all duration-500 ease-out
          ${isExpanded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none absolute'
          }
        `}>
          <p className="font-[family-name:var(--font-mitr-reg)] leading-relaxed">{description}</p>
        </div>

        {/* Expand/Collapse Icon */}
        <div className={`
          absolute bottom-6 
          h-8 w-8 rounded-full
          flex items-center justify-center
          border border-white/30
          transition-transform duration-500
          hover:bg-white/10
          ${isExpanded ? 'rotate-180' : 'rotate-0'}
        `}>
          <svg 
            className="w-4 h-4 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TextRevealCard;