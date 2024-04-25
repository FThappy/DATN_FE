import React from 'react'
import { Inter, Dancing_Script } from "next/font/google";
import ButtonHome from '../utils/ButtonHome/ButtonHome';
import UrgentCauseCard from './urgentCausesCard/UrgentCauseCard';
import TextUnderline from '../utils/TextUnderline';
import { causes } from '@/lib/placeholder-data';

const dancing = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const colors = ["#F84D42", "#FFB840", "#20b86d"];
const UrgentCause = () => {
  return (
    <div
      className="w-full h-[800px] bg-cover "
      style={{ backgroundImage: "url(/bg2.jpg)" }}
    >
      <div className="flex flex-col items-center w-full h-full bg-orange-50/70 px-[3rem] py-8 ">
        <div className="flex  w-[90rem] h-[650px] mt-10 p-4">
          <div className=" w-[20rem] ">
            <p
              className={`${dancing.className} font-bold text-red text-4xl mb-6`}
            >
              Urgent Cause
            </p>
            <p
              className={`${inter.className} font-bold text-slate-800 text-4xl leading-[3rem] mb-6`}
            >
              We Help More Than
              <TextUnderline
                chilldren=" 9K Children "
                width={220}
                top="2rem"
                left="0.6rem"
              />
              Every Year
            </p>
            <p className={`${inter.className}  text-neutral-800 mb-8`}>
              BigHearts is the largest global crowdfunding community connecting
              nonprofits, donors, and companies in nearly every country. We help
              nonprofits from
            </p>
            <ButtonHome link="/" title="VIEW ALL CAUSES" width="13" color="#F84D42" />
          </div>
          <div className=" ml-12 flex gap-10">
            {causes.map((cause, index) => (
              <div key={index}>
                <UrgentCauseCard cause={cause} color={colors[index]}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrgentCause