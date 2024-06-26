import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
const ImageGroupPreview = ({ listUrl }: { listUrl: (File | string)[] }) => {
    return (
      listUrl.length > 0 && (
        <Carousel>
          <CarouselContent className="w-full desktop:h-[35rem] laptop:h-[30rem] ml-0 pl-0">
            {listUrl.map((file, index) => (
              <CarouselItem
                key={index}
                className="ml-0 pl-0 relative flex w-full items-center justify-center"
              >
                <Image
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt="image"
                  fill={true}
                  sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
                  className=" group-hover:opacity-75 cursor-pointer object-fit rounded-[8px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {listUrl.length > 1 ? (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          ) : (
            <></>
          )}
        </Carousel>
      )
    );
};

export default ImageGroupPreview;
