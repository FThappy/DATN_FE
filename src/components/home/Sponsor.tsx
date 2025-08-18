import React from 'react';
import Image from 'next/image';
import { logoSponsors } from '@/lib/placeholder-data';

const Sponsor = () => {
  return (
    <div className='flex  items-center justify-center w-full h-[150px] bg-gray-100 gap-8'>
      {logoSponsors.map((item, index) => (
        <Image
          key={index}
          src={`/${item}.webp`}
          alt={item}
          loading='lazy'
          height={180}
          width={180}
          className='cursor-pointer'
        />
      ))}
    </div>
  );
};

export default Sponsor;
