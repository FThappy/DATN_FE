import Image from 'next/image';
import * as React from 'react';



export default function TextUnderline ({chilldren,width,top,left}: {chilldren : string, width : number, top : string , left :string}) {
  return (
    <span className="relative">
      {chilldren}
      <Image
        src="/title-underline.png"
        alt="title-underline"
        loading="lazy"
        height={10}
        width={width}
        className="absolute "
        style={{
          left: `${left}`,
          top: `${top}`,
        }}
      />
    </span>
  );
}
