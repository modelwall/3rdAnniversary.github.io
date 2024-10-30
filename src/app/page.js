"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import InteractiveBackground from "@/components/interactiveBG";
import CardStack from "@/components/cardStack";
import ImagesBackground from "@/components/ImagesBG";
import TextRevealCard from "@/components/textCard";
import HeartCheckbox from "@/components/heartbox";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [formOpacity, setFormOpacity] = useState("opacity-100");
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationOpacity, setCelebrationOpacity] = useState("opacity-0");
  const [shake, setShake] = useState(false);

  // Generate arrays for dates and months
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const handleSubmit = () => {
    const isDateCorrect = selectedDate === "23";
    const isMonthCorrect = selectedMonth === "11";
    const isYearCorrect = selectedYear === "2021";

    setFormOpacity("opacity-0");
    setTimeout(() => {
      setShowForm(false);
      setShowCelebration(true);
      setTimeout(() => {
        setCelebrationOpacity("opacity-100");
      }, 100);
    }, 500);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>

      {showForm && (
        <ImagesBackground>
          <div className="relative">
            {/* Animated gradient backgrounds */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy blur-sm"></div>

            {/* Main sharp gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-xl group-hover:opacity-90 animate-gradient-x"></div>

            {/* Glowing spots */}
            <div className="absolute -inset-1 rounded-xl opacity-50 group-hover:opacity-70 blur-xl bg-gradient-to-r from-pink-500 via-transparent to-purple-500 animate-pulse"></div>
            {/* Main content container */}
            <div
              className={`backdrop-blur-xl rounded-xl lg:py-14 lg:px-24 px-5 py-6 w-full max-w-2xl relative z-10 bg-white flex justify-center transition-opacity duration-500 ease-in-out ${formOpacity}`}
            >
              <div className="space-y-4">
                <span className="text-2xl lg:text-3xl md:text-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text text-center font-[family-name:var(--font-mitr-reg)]">
                  กรอกวันที่เริ่มคบให้ถูกก่อน!
                </span>
                <div className="flex flex-row justify-center">
                  <select
                    className={`p-2 me-2 w-15 border rounded-lg text-black bg-white hover:border-yellow-300 
            ${!isCorrect && selectedDate !== "23" ? "border-red-500" : ""} 
            ${shake && selectedDate !== "23" ? "shake" : ""}`}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="" disabled>
                      Day
                    </option>
                    {dates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>

                  <select
                    className={`p-2 me-2 border rounded-lg text-black bg-white hover:border-yellow-300 
            ${!isCorrect && selectedMonth !== "11" ? "border-red-500" : ""} 
            ${shake && selectedMonth !== "11" ? "shake" : ""}`}
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {months.map((month, index) => (
                      <option key={month} value={(index + 1).toString()}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    className={`p-2 border rounded-lg text-black bg-white hover:border-yellow-300 
            ${!isCorrect && selectedYear !== "2021" ? "border-red-500" : ""} 
            ${shake && selectedYear !== "2021" ? "shake" : ""}`}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className={`w-full py-3 text-xl rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden 
          font-[family-name:var(--font-mitr-reg)] 
          ${
            isHovered
              ? "bg-gradient-to-r from-pink-500 to-purple-500"
              : "bg-gray-700"
          }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleSubmit}
                >
                {isCorrect ? "ยืนยัน" : "ให้โอกาสอีกที"}
              </button>
            </div>
          </div>
        </div>
        </ImagesBackground>
      )}

      {showCelebration && (
        <InteractiveBackground>
          <div
            className={`container-fluid pt-5 flex justify-center transition-opacity duration-500 ease-in-out ${celebrationOpacity}`}
          >
            <span className="lg:text-7xl md:text-6xl text-3xl text-outline-black text-center font-[family-name:var(--font-pacifico)]">
              Happy 3rd anniversary!
            </span>
          </div>
          <div className="grid-rows-1 grid grid-cols-3 lg:mt-12 mt-5">
            {/* First Image */}
            <div className="justify-self-end">
              <div className="relative group">
                {/* Animated gradient backgrounds */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy blur-sm"></div>

                {/* Main sharp gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-pink-500 to-white rounded-full group-hover:opacity-90 animate-gradient-x"></div>

                {/* Glowing spots */}
                <div className="absolute -inset-2 rounded-full opacity-50 group-hover:opacity-70 blur-xl bg-gradient-to-r from-white via-transparent to-white animate-pulse"></div>

                <Image
                  src={`${basePath}/images/face1.png`}
                  alt="test4"
                  width={150}
                  height={150}
                  className="relative shadow-xl w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] mt-2 object-cover rounded-full z-10"
                />
              </div>
            </div>

            <div className="lg:mt-1 lg:mx-10 mx-2">
              <p className="text-center font-[family-name:var(--font-pacifico)] text-outline-black lg:text-5xl text-2xl">
                {"nattakan"}
              </p>
              <div className="flex justify-center lg:pt-3 lg:pb-2">
                <HeartCheckbox/>
              </div>
              <p className="text-center font-[family-name:var(--font-pacifico)] text-outline-black lg:text-5xl text-2xl">
                {"apinya"}
              </p>
            </div>

            {/* Second Image */}
            <div className="justify-self-start">
              <div className="relative group">
                {/* Animated gradient backgrounds */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-gray-400 to-white rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy blur-sm"></div>

                {/* Main sharp gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-pink-500 to-white rounded-full group-hover:opacity-90 animate-gradient-x"></div>

                {/* Glowing spots */}
                <div className="absolute -inset-2 rounded-full opacity-50 group-hover:opacity-70 blur-xl bg-gradient-to-r from-white via-transparent to-gray-400 animate-pulse"></div>

                <Image
                  src={`${basePath}/images/face2.png`}
                  alt="test4"
                  width={150}
                  height={150}
                  className="relative shadow-xl w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] mt-2 object-cover rounded-full z-10"
                />
              </div>
            </div>
          </div>
          <div className="bg-white hover:bg-yellow-200 text-black lg:mt-10 mt-6 rounded-xl container max-w-xl mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-3 font-[family-name:var(--font-mitr-reg)]">
            <p className="text-center text-sm md:text-xl mb-1 lg:mb-0">
              เพลงรัก - Three Man Down
            </p>
            <audio controls loop className="lg:w-full w-72 mx-auto h-8 lg:h-16">
              <source
                src={`${basePath}/images/เพลงรัก - Three Man Down.mp3`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="lg:mt-10 mt-6 w-full justify-items-center grid-rows-1 grid grid-cols-3 gap-4">
            <div className="lg:-mt-40 lg:ms-0 ms-5 mt-10">
              <Image
                src={`${basePath}/images/4.png`}
                alt="test1"
                width={350}
                height={300}
                className="shadow-2xl"
              />
            </div>
            <div className="">
              {/* <Image src="/images/2.jpeg" alt="test2" width={500} height={100} className="shadow-2xl"/>
                <Image src="/images/1.jpg" alt="test3" width={500} height={300} className="mt-3 shadow-2xl"/> */}
              <CardStack />
            </div>
            <div className="lg:-mt-40 lg:me-0 me-10 mt-10">
              <Image
                src={`${basePath}/images/3.jpg`}
                alt="test4"
                width={350}
                height={300}
                className="shadow-2xl"
              />
            </div>
            {/* <div></div>
              <div className="w-1/2 mt-10">
                <video muted autoPlay loop className="shadow-2xl">
                  <source src="/images/video1.mp4" type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div> */}
          </div>
          {/* <div className="bg-white w-full h-1 mt-40 mb-10"></div> */}
          <div className="w-full mt-40 lg:w-2/3 mb-10">
            <TextRevealCard
              title="มีอะไรซ่อนอยู่นะ ?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              backgroundColor="bg-gray-700 hover:bg-gradient-to-b from-purple-600 to-yellow-300"
            />
          </div>
        </InteractiveBackground>
      )}
    </>
  );
}
