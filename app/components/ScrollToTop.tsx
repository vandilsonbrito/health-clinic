"use client";

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { IoArrowUp } from "react-icons/io5";


const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Link to="top" smooth={true} duration={300} className={`${scrollY > 570 ? 'visible' : 'hidden'}`}>
        <div className="w-10 h-10 bg-blueSecundary rounded-md hidden xl:flex justify-center items-center fixed bottom-6 right-2">
          <IoArrowUp className=" text-2xl text-white cursor-pointer"/>
        </div>
      </Link>
    </>
  );
};

export default ScrollToTop;
