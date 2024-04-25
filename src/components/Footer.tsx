import React from 'react'
import { Inter,Dancing_Script } from 'next/font/google';
import Image from "next/image";
import FooterIcon from './FooterIcon';
import Link from 'next/link';
import { imageGallery } from '../lib/placeholder-data';

const dancing = Dancing_Script({ subsets: ["latin"] });
const Footer = () => {
  return (
    <div
      className="flex items-center w-srceen h-[500px] bg-cover bg-center	"
      style={{ backgroundImage: "url(/logo-footer-1.webp)" }}
    >
      <div className="flex gap-8 items-center w-full h-[500px] bg-black/85 px-10 py-8 ">
        <div className="flex flex-col  w-2/6 h-full">
          <div className="flex items-center ">
            <Image
              src="/logo.png"
              alt="logo"
              loading="lazy"
              height={180}
              width={180}
            />
            <h1
              className={`absolute ${dancing.className} font-bold text-4xl text-lime-500 z-10 left-[160px]`}
            >
              Chung Tay
            </h1>
          </div>
          <p className="text-white text-1xl">
            Wimply dummy text of the priatype industry orem Ipsum has Maecenas
            quis eros at ante lacinia efficitur.
          </p>
          <FooterIcon />
        </div>
        <div className="flex items-center justify-center w-4/6 gap-12  h-full">
          <div className="flex flex-col mt-24 h-full">
            <Link href="/" className="font-normal text-4xl text-white">
              About
            </Link>
            <Link
              href="/"
              className="font-normal text-[18px] text-white mt-8 mb-4"
            >
              Home
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              Donation
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              About us
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              Event
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white">
              Features
            </Link>
          </div>
          <div className="flex flex-col mt-24  h-full">
            <Link href="/" className="font-normal text-4xl text-white">
              Quick links
            </Link>
            <Link
              href="/"
              className="font-normal text-[18px] text-white mt-8 mb-4"
            >
              Causes
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              About
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              New campaogn
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              Site map
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white">
              Stories
            </Link>
          </div>
          <div className="flex flex-col mt-24  h-full">
            <Link href="/" className="font-normal text-4xl text-white">
              Explore
            </Link>
            <Link
              href="/"
              className="font-normal text-[18px] text-white mt-8 mb-4"
            >
              Donate
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              Campaigns
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              Fundraise
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white mb-4">
              Volunteers
            </Link>
            <Link href="/" className="font-normal text-[18px] text-white">
              Sponsors
            </Link>
          </div>
        </div>
        <div className="w-3/6 pt-12 h-full">
          <p className="font-normal text-4xl text-white">Photo Gallery</p>
          <div className="grid grid-cols-3 gap-2 mt-8 w-[290px]">
            {imageGallery.map((image, index) => (
              <Image
                src={image}
                alt="logo"
                loading="lazy"
                height={95}
                width={95}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer