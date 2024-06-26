import React from 'react'
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';


const ImageContainer = ({postImg}: {postImg:string[]}) => {
  return (
        postImg.length > 0 && (
          <Carousel>
            <CarouselContent className="w-full desktop:h-[35rem] laptop:h-[30rem] ml-0 pl-0">
              {postImg.map((url, index) => (
                <CarouselItem key={index} className="ml-0 pl-0 relative flex w-full items-center justify-center">
                  <img
                    src={url}
                    alt="image"
                    className="w-auto max-w-full desktop:h-[32rem] laptop:h-[27rem]  cursor-pointer object-fit rounded-[8px]"
                    loading="lazy"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {postImg.length > 1 ? (
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
}

export default ImageContainer