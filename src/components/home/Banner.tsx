import React from 'react';
import { Inter, Dancing_Script } from 'next/font/google';
import ButtonHome from '../utils/ButtonHome/ButtonHome';
import TextUnderline from '../utils/TextUnderline';

const inter = Inter({ subsets: ['latin'] });

const Banner = () => {
  return (
    <div className='w-full h-[820px] bg-cover laptopDefault:h-[650px]' style={{ backgroundImage: 'url(/bg1.jpg)' }}>
      <div className='flex flex-col items-center w-full h-full bg-black/75 py-8 laptop:px-[2rem] desktop:px-[16rem]'>
        <p className={`text-white text-[4.5rem] font-bold	${inter.className} text-center mt-16`}>
          Đóng Góp Dù Chỉ Là Nhỏ Cũng Có Thể Mang Lại Giá Trị
          <TextUnderline chilldren=' Lớn Hơn' width={285} top='5rem' left='1.5rem' />
        </p>
        <p className={`text-white text-[1.2rem]  ${inter.className} text-center mt-8 w-[46rem]`}>
          Chỉ khi cả xã hội cùng chung tay đóng góp, chúng ta mới có thể tạo ra tác động. Hãy cùng chung tay để xã hội
          tốt đẹp hơn.
        </p>
        <div className='mt-8 flex items-center justify-center gap-8'>
          <ButtonHome link='/project' title='DONATE NOW' width='10' color='#F84D42' />
          <ButtonHome link='/login' title='THAM GIA' width='8.75' color='#FFB840' />
        </div>
      </div>
    </div>
  );
};

export default Banner;
