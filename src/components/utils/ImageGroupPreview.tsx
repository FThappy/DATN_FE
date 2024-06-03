import React from "react";
import Image from "next/image";
import ImageContainerPreview from "./ImageContainerPreview";
const ImageGroupPreview = ({ listUrl }: { listUrl: (File | string)[] }) => {
  if (listUrl.length >= 6) {
    return (
      <section className=" my-3 grid grid-cols-gallery  grid-rows-galleryRow auto-rows-64  h-[30rem]  relative">
        {listUrl.slice(0, 6).map((file, index) => (
          <ImageContainerPreview file={file} index={index} key={index} />
        ))}
        {listUrl.length -6 > 0  &&   <div
          className="absolute flex items-center justify-center w-[31.8%] bg-black/50 z-[40] h-[48.5%] m-1 bottom-[0] right-[0]
           text-white font-bold text-[2.4rem] cursor-pointer rounded-[12px]"
        >
          + {listUrl.length - 6}
        </div>}
       
      </section>
    );
  }
  if (listUrl.length < 6 && listUrl.length >= 4) {
    return (
      <section className=" my-3 grid grid-cols-gallery  grid-rows-galleryRow auto-rows-64  h-[30rem]  relative">
        {listUrl.slice(0, 3).map((file, index) => (
          <ImageContainerPreview file={file} index={index} key={index} />
        ))}
        <div
          className="absolute flex items-center justify-center w-[31.8%] bg-black/50 z-[40] h-[98.5%] m-1 bottom-[0] right-[0]
           text-white font-bold text-[2.4rem] cursor-pointer rounded-[12px]"
        >
          + {listUrl.length - 3}
        </div>
      </section>
    );
  }
  return (
    <section className=" my-1 grid grid-cols-gallery  grid-rows-galleryRow auto-rows-64  h-[30rem]  relative">
      {listUrl.map((file, index) => (
        <ImageContainerPreview file={file} index={index} key={index} />
      ))}
    </section>
  );
};

export default ImageGroupPreview;
