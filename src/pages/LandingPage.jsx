import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router';
const LandingPage = () => {
  const [longUrl, setlongUrl] = useState()
  const navigate = useNavigate()

  const handleShorten = (e) => {
    e.preventDefault()
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    } else {
      alert('Enter Long URL first');
    }
  }
  return (
    <div className=" justify-center  min-h-screen  px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center font-sans text-white transition duration-300 ease-in-out hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,223,100,0.75)]">
        Welcome to Qlinky,The Best URL shortener cum QR Generator with Analytics you will come acorss on the Internet.
      </h1>
      <br />
      <h2 className="text-center">Paste your Link in the Input Box and witness the Magic.</h2>
      <form onSubmit={handleShorten} className="sm:flex-row flex flex-col" action="">
        <Input
          type='url'
          value={longUrl}
          placeholder="Enter Your Link Here"
          onChange={(e) => { setlongUrl(e.target.value) }}
        />
        <Button type='submit' variant='destructive'>Shorten</Button>
      </form>
      <br />
      <img className="w-6/7 mt-1 mx-auto" src="/heroSection2.jpg" alt="Banner" />
      <Accordion type="multiple" collapsible className='w-full md:px-11'>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the way forward?</AccordionTrigger>
          <AccordionContent>
            Either Login?Signup first or Enter your long url in the input box and you will be redirected automatically . 
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I generate QR code for my Link?</AccordionTrigger>
          <AccordionContent>
            Yes, you will get a QR Code almost instantaneously for your Link. 
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Will I get Click monitoring for the QR also?</AccordionTrigger>
          <AccordionContent>
            No, as of now , we monitor only the short url provided by us.            
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  );
};

export default LandingPage;
