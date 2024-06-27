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
              Giúp đỡ trẻ em đến trường
            </p>
            <p
              className={`text-white text-[1.2rem]  ${inter.className} text-center mb-10 `}
            >
            Sự giúp đỡ nhỏ bé của bạn có thể khiến hàng triệu đứa trẻ mỉm cười
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
              Hỗ trợ y tế
            </p>
            <p
              className={`text-white text-[1.2rem]  ${inter.className} text-center mb-10 `}
            >
              Dù là việc nhỏ nhất, nhưng nó có thể khiến hàng triệu người được thăm khám chữa bệnh .
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
              Biến đổi khí hậu & Thiên tai
            </p>
            <p
              className={`text-white text-[1.2rem]  ${inter.className} text-center mb-10 `}
            >
              Từng động thái nhỏ của bạn có thể giúp môi trường và khí hậu trở nên tốt hơn.
            </p>
            <ButtonHome
              link="/project"
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