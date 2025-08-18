import Image from 'next/image';
import React from 'react';
import { Inter, Dancing_Script } from 'next/font/google';
import TextUnderline from '../utils/TextUnderline';
import ButtonHome from '../utils/ButtonHome/ButtonHome';

const dancing = Dancing_Script({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const AboutUs = () => {
  return (
    <div className='flex items-center w-full h-[820px] bg-slate-50 px-[3rem] py-8 gap-4'>
      <div className='flex items-center justify-center w-1/2  h-full gap-8'>
        <Image src='/about1.webp' alt='about1' loading='lazy' height={85} width={250} className='mb-[10rem]' />
        <div className='flex flex-col gap-4 '>
          <Image src='/cause3.webp' alt='about2' loading='lazy' height={85} width={250} />
          <Image src='/about3.webp' alt='about3' loading='lazy' height={60} width={250} />
        </div>
      </div>
      <div className=' w-1/2 h-full pr-[10rem]'>
        <p className={`${dancing.className} font-bold text-red text-4xl mb-4`}>Về chúng tôi</p>
        <p className={`${inter.className} font-bold text-slate-800 text-[2.5rem] mb-12`}>
          Những điều khiến chúng tôi trở nên
          <TextUnderline chilldren=' đặc biệt ' width={300} top='2.8rem' left='0.8rem' />
          hơn những tổ trức khác.
        </p>
        <p className={`${inter.className}  text-neutral-800 mb-8`}>
          Chúng tôi mang đến cho bạn những trải nghiệm thiết thực về việc tạo dự án từ thiện, chia sẻ dự án của bạn tới
          bạn bè, người thân và những người xung quanh qua mạng xã hội cùng chúng tôi. Đồng thời cho phép bạn chia sẻ
          các bài đăng kêu gọi sự đồng hành và lan toản dự án
        </p>
        <div className='flex gap-4'>
          <div
            className='w-[90px] h-[90px] bg-cover flex items-center justify-center'
            style={{ backgroundImage: 'url(/circle-red.png)' }}
          >
            <Image src='/solidarity.png' alt='solidarity' loading='lazy' height={40} width={40} />
          </div>
          <div>
            <p className={`${inter.className} font-bold text-slate-800 text-[2.8rem] `}>876,000</p>
            <p className={`${inter.className} font-bold text-gray-600 `}>Mỗi năm có thêm 78.000 người tham gia.</p>
          </div>
        </div>
        <div className='flex gap-4 mt-8'>
          <div
            className='w-[90px] h-[90px] bg-cover flex items-center justify-center'
            style={{ backgroundImage: 'url(/circle-green.png)' }}
          >
            <Image src='/handshake.png' alt='handshake' loading='lazy' height={40} width={40} />
          </div>
          <div>
            <p className={`${inter.className} font-bold text-slate-800 text-[2.8rem] `}>45,000</p>
            <p className={`${inter.className} font-bold text-gray-600 `}>Các nhà hảo tâm luôn sẵn sàng giúp đỡ bạn.</p>
          </div>
        </div>
        <div className='mt-6 flex '>
          <ButtonHome link='/social' title='Khám phá thêm' width='14' color='#F84D42' />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
