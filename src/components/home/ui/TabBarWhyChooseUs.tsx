'use client';
import { MVV } from '@/lib/placeholder-data';
import React, { useState } from 'react';

const TabBarWhyChooseUs = () => {
  const [idActive, setIdActive] = useState<number>(0);

  return (
    <div>
      <div className='flex gap-4'>
        {MVV.map((item, index: number) => (
          <button
            key={index}
            onClick={() => setIdActive(index)}
            className={`rounded ${
              idActive === index ? 'bg-red' : 'bg-gray-200/30'
            } text-white p-3 font-bold text-[1.2rem]`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p
        className={`rounded 
         text-white mt-4  text-[1.2rem] pr-8 h-[100px]`}
      >
        {MVV[idActive].description}
      </p>
    </div>
  );
};

export default TabBarWhyChooseUs;
