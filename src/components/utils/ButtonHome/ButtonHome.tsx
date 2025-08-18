import Link from 'next/link';
import React from 'react';
import './button.css';

const ButtonHome = ({ link, title, width, color }: { link: string; title: string; width: string; color: string }) => {
  return (
    <Link
      href={link}
      className={`h-[3.4rem] relative flex items-center justify-center rounded font-bold text-white text-xl  after:absolute after:left-[-5px] after:bottom-[-5px]
      after:border-dashed after:border-[1px] after:z-10 after:visible after:w-full  after:h-[3.4rem] after:rounded 
      after:hover:left-[0px] after:hover:bottom-[0px] after:hover:z-[-10] animaties
      `}
      style={{
        width: `${width}rem`,
        backgroundColor: `${color}`,
        '--color': `${color}`
      }}
    >
      {title}
    </Link>
  );
};

export default ButtonHome;
