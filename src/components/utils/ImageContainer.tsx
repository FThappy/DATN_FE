import React from 'react'
import Image from "next/image";


const ImageContainerPreview = ({file,index}: {file:string, index:number}) => {
  return (
    <div
      key={index}
      className="h-full flex items-center justify-center rounded-xl relative overflow-hidden group m-1"
    >
      <img
        src={file}
        alt="image"
        // fill={true}
        // sizes="(min-width: 1280px) 420px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
        className="w-full h-full group-hover:opacity-75 cursor-pointer "
      />
    </div>
  );
}

export default ImageContainerPreview