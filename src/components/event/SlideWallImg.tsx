import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

type Props = {
  listWallImg: string[];
};

const SlideWallImg = (props: Props) => {
  const { listWallImg } = props;
  return (
    <>
      {listWallImg.length > 0 ? (
        <Carousel>
          <CarouselContent className="w-full desktop:h-[35rem] laptop:h-[30rem] ml-0 pl-0">
            {listWallImg.map((url, index) => (
              <CarouselItem key={index} className="ml-0 pl-0 relative">
                <img
                  src={url}
                  alt="image"
                  className="w-full desktop:h-[35rem] laptop:h-[30rem]  cursor-pointer object-cover "
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {listWallImg.length > 1 ? (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          ) : (
            <></>
          )}
        </Carousel>
      ) : (
        <div className="bg-gray-200 w-full desktop:h-[35rem] laptop:h-[30rem] relative"></div>
      )}
    </>
  );
};

export default SlideWallImg;
