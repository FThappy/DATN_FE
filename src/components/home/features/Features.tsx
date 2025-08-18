import React from 'react';
import SlideFeatures from './SlideFeatures';
import { Inter, Dancing_Script } from 'next/font/google';
import TextUnderline from '../../utils/TextUnderline';
import Image from 'next/image';

const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const Features = () => {
  return (
    <div className='flex w-full h-[720px] bg-cover' style={{ backgroundImage: 'url(/bg4.jpg)' }}>
      <div
        className='laptop:w-[25rem] desktop:w-[50rem] h-[720px] bg-cover'
        style={{ backgroundImage: 'url(/feature-slider-bg.jpg)' }}
      >
        <div className='flex flex-col items-center justify-center w-full h-full bg-black/40 '>
          <SlideFeatures />
        </div>
      </div>
      <div className='flex flex-col pt-[5rem] pl-[4rem]'>
        <p className={`${dancing.className} font-bold text-red text-4xl mb-2`}>Các tính năng</p>
        <p className={`${inter.className} font-bold text-slate-800 text-[3rem] mb-8`}>
          Bạn có thể
          <TextUnderline chilldren=' giúp gi?' width={240} top='3.2rem' left='1rem' />
        </p>
        <p className={`${inter.className}  text-neutral-800 mb-8 text-[1.2rem] w-[35rem]`}>
          Một hành động giúp đỡ nhỏ bé từ bạn có thể lan tỏa niềm vui và đem lại nụ cười lớn cho hàng triệu đứa trẻ trên
          khắp thế giới.
        </p>
        <div className='grid grid-cols-3 gap-2 pt-6'>
          <div className='flex flex-col '>
            <div
              className='w-[90px] h-[90px] bg-cover flex items-center justify-center'
              style={{ backgroundImage: 'url(/circle-yellow.png)' }}
            >
              <Image src='/donation.png' alt='donation' loading='lazy' height={40} width={40} />
            </div>
            <p className={`${inter.className} font-bold text-slate-800 text-[2rem] `}>Quyên góp từ thiện</p>
            <p className={`${inter.className}  text-neutral-800 mb-8 text-[1.2rem] `}>
              Một sự quyên góp từ bạn là hành động giúp đỡ nhằm cải thiện đời sống và lan tỏa niềm vui cho những người
              có hoàn cảnh khó khăn.
            </p>
          </div>
          <div className='flex flex-col '>
            <div
              className='w-[90px] h-[90px] bg-cover flex items-center justify-center'
              style={{ backgroundImage: 'url(/circle-green.png)' }}
            >
              <Image src='/handshake.png' alt='handshake' loading='lazy' height={40} width={40} />
            </div>
            <p className={`${inter.className} font-bold text-slate-800 text-[2rem] `}>Lan tỏa</p>
            <p className={`${inter.className}  text-neutral-800 mb-8 text-[1.2rem] `}>
              Mỗi lần chia sẻ các dự án, sự kiện thiện nguyện sẽ giúp những người khác biết đến và tham gia vào các hoạt
              động nhằm lan tỏa lòng tốt đẹp đến những người có hoàn cảnh khó khăn.
            </p>
          </div>
          <div className='flex flex-col '>
            <div
              className='w-[90px] h-[90px] bg-cover flex items-center justify-center'
              style={{ backgroundImage: 'url(/circle-red.png)' }}
            >
              <Image src='/solidarity.png' alt='solidarity' loading='lazy' height={40} width={40} />
            </div>
            <p className={`${inter.className} font-bold text-slate-800 text-[1.8rem]  `}>Trở thành nhà hảo tâm</p>
            <p className={`${inter.className}  text-neutral-800 mb-8 text-[1.2rem] `}>
              Bằng cách này, bạn có thể góp phần xây dựng một cộng đồng tốt đẹp hơn và làm thay đổi tích cực cho thế
              giới xung quanh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
