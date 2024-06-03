import React from "react";
import Image from "next/image";
import ImageContainer from "./ImageContainer";

const ImageGroup = ({ listUrl }: { listUrl: (string )[] }) => {
  if (listUrl.length > 6) {
    return (
      <section className="px-1 my-3 grid laptop:grid-cols-gallerys desktop:grid-cols-gallerydesktop auto-rows-64 gap-y-1 h-[35rem]  relative">
        {listUrl.slice(0, 6).map((file, index) => (
          <ImageContainer file={file} index={index} key={index} />
        ))}
        <div
          className="absolute flex items-center justify-center w-[32.4%] bg-black/50 z-[40] h-[50%]  m-1 bottom-[-9px] right-[3px]
           text-white font-bold text-[2.4rem] cursor-pointer rounded-[12px]"
        >
          + {listUrl.length - 4}
        </div>
      </section>
    );
  }
  if (listUrl.length <= 6 && listUrl.length >= 4) {
    return (
      <section className="px-1 my-3 grid grid-cols-gallery  auto-rows-64  h-[35rem]  relative">
        {listUrl.slice(0, 3).map((file, index) => (
          <ImageContainer file={file} index={index} key={index} />
        ))}
        <div
          className="absolute flex items-center justify-center w-[32.3%] bg-black/50 z-[40] h-[100%] m-1 bottom-[-9px] right-[3px]
           text-white font-bold text-[2.4rem] cursor-pointer rounded-[12px]"
        >
          + {listUrl.length - 2}
        </div>
      </section>
    );
  }
  return (
    <section className="px-1 my-3 grid grid-cols-gallerys  auto-rows-64  h-[35rem]  relative">
      {listUrl.map((file, index) => (
        <ImageContainer file={file} index={index} key={index} />
      ))}
    </section>
  );
};

export default ImageGroup;
