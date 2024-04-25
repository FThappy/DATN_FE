import React from 'react'
import { Inter, Dancing_Script } from "next/font/google";
import TextUnderline from '../utils/TextUnderline';
import UrgentCauseCard from './urgentCausesCard/UrgentCauseCard';
import { ourcauses } from '@/lib/placeholder-data';


const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const colors = ["#F84D42", "#FFB840", "#20b86d"];

const OurCause = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[820px] bg-slate-200 gap-4">
      <p className={`${dancing.className} font-bold text-red text-4xl `}>
        Our Causes
      </p>
      <p
        className={`${inter.className} font-bold text-slate-800 text-4xl  mb-4`}
      >
        Our
        <TextUnderline
          chilldren=" Latest Causes"
          width={270}
          top="2rem"
          left="0.6rem"
        />
      </p>
      <p
        className={`${inter.className}  text-neutral-800 mb-4 w-[40rem] text-[1.3rem] text-center`}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem
        voluptatem obcaecati consectetur adipisicing
      </p>
      <div className= 'flex gap-4 '>
      {ourcauses.map((cause, index) => (
        <div key={index}>
          <UrgentCauseCard cause={cause} color={colors[index % 3]} />
        </div>
      ))}
      </div>
    </div>
  );
}

export default OurCause