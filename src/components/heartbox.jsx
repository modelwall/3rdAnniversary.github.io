import React from 'react';

const HeartCheckbox = ({ 
  checked: initialChecked = false, 
  onChange
}) => {
  const [checked, setChecked] = React.useState(initialChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className="group relative block cursor-pointer text-xl select-none transition-transform duration-100 hover:scale-110">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="absolute h-0 w-0 opacity-0 cursor-pointer"
      />
      {/* Using Tailwind's responsive classes to change size at lg breakpoint */}
      <div className={`transition-transform duration-100 h-10 w-10 lg:h-16 lg:w-16 ${checked ? 'animate-like' : 'animate-dislike'}`}>
        <svg viewBox="0 0 256 256" className="w-full h-full">
          <rect fill="none" height="256" width="256"></rect>
          <path
            d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
            className={`transition-all duration-200 stroke-2 stroke-white ${
              checked ? 'fill-[#FF5353] stroke-0' : 'fill-none stroke-[20]'
            }`}
          />
        </svg>
      </div>
    </label>
  );
};

export default HeartCheckbox;