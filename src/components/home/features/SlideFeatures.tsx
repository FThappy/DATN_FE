'use client'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./slideFeatures.css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Inter, Dancing_Script } from "next/font/google";
import ButtonHome from '../../utils/ButtonHome/ButtonHome';

const inter = Inter({ subsets: ["latin"] });

const SlideFeatures = () => {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="px-2 flex flex-col justify-center items-center">
            <p
              className={`text-white text-[3rem] font-bold ${inter.className} text-center`}
            >
              Child Education Help
            </p>
            <p
              className={`text-white text-[1.2rem]  ${inter.className} text-center mb-10 `}
            >
              Your little help can make milion children smile model sentence
              structures
            </p>
            <ButtonHome
              link="/"
              title="DONATION NOW"
              width="13"
              color="#F84D42"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="px-2 flex flex-col justify-center items-center">
            <p
              className={`text-white text-[3rem] font-bold ${inter.className} text-center`}
            >
              Child Education Help
            </p>
            <p
              className={`text-white text-[1.2rem]  ${inter.className} text-center mb-10 `}
            >
              Your little help can make milion children smile model sentence
              structures
            </p>
            <ButtonHome
              link="/"
              title="DONATION NOW"
              width="13"
              color="#FFB840"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="px-2 flex flex-col justify-center items-center">
            <p
              className={`text-white text-[3rem] font-bold ${inter.className} text-center`}
            >
              Child Education Help
            </p>
            <p
              className={`text-white text-[1.2rem]  ${inter.className} text-center mb-10 `}
            >
              Your little help can make milion children smile model sentence
              structures
            </p>
            <ButtonHome
              link="/"
              title="DONATION NOW"
              width="13"
              color="#20b86d"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SlideFeatures