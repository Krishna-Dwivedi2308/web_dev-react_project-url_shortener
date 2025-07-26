import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const LandingPage = () => {
  return (
    <div className=" justify-center  min-h-screen  px-4">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-center font-sans text-white transition duration-300 ease-in-out hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,223,100,0.75)]">
        Welcome to Qlinky,The Best URL shortener you will come acorss on the Internet.
      </h1>
      <br />
      <h2 className="text-center">Paste your Link in the Input Box and witness the Magic.</h2>
      <form className="flex" action="">
        <Input placeholder="Enter Your Link Here" value="link" />
        <Button>Shorten</Button>
      </form>
      <br />
      <img className="w-6/7 mt-1 mx-20" src="public/heroSection2.jpg" alt="Banner" />
    </div>
  );
};

export default LandingPage;
