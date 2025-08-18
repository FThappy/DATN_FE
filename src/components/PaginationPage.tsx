import { getTotalPageEvent } from '@/actions/getTotalPageEvent';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import toastifyUtils from '@/utils/toastify';
import { EventProps } from '@/utils/typeEvent';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Id } from 'react-toastify';

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<EventProps[]>>;
  totalPage: number[];
  setTotalPage: React.Dispatch<React.SetStateAction<number[]>>;
  getTotalPageEvent: () => Promise<Id | undefined>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};

export function PaginationPage(props: Props) {
  const { setTotalPage, totalPage, getTotalPageEvent, active, setActive, page } = props;
  const number = 28;

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const qSearch = searchParams.get('qSearch');

  const qDate = searchParams.get('qDate');

  const qSort = searchParams.get('qSort');

  const qCity = searchParams.get('qCity');

  useEffect(() => {
    getTotalPageEvent();
  }, []);

  const [indexPage, setIndexPage] = useState(0);

  useEffect(() => {
    if (totalPage.length > 6 && active <= totalPage.length - 3) {
      setIndexPage(Math.floor(page / 3) * 3);
    }
  }, [page, totalPage.length]);

  // const handleClick = (page: number) => {
  //   setActive(page);
  //   handleGetEventPage(page - 1);
  // };

  // const handlePrev = () => {
  //   setActive((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  //   if (
  //     (active - 1) % 3 === 0 &&
  //     active >= 3 &&
  //     active < totalPage.length - 3
  //   ) {
  //     setIndexPage((number) => number - 3);
  //   }
  //   handleGetEventPage(active - 2);
  // };

  // const handleNext = () => {
  //   setActive((prevPage) => (prevPage < number ? prevPage + 1 : prevPage));
  //   if (active % 3 === 0 && active >= 3 && active < totalPage.length - 3) {
  //     console.log(active);
  //     setIndexPage((number) => number + 3);
  //   }
  //   handleGetEventPage(active);
  // };

  if (totalPage.length <= 6) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='hover:bg-white cursor-pointer'
              // onClick={handlePrev}
              href={
                !(
                  (qSearch && qSearch !== 'undefined') ||
                  (qDate && qDate !== 'undefined') ||
                  (qSort && qSort !== 'undefined') ||
                  (qCity && qCity !== 'undefined')
                )
                  ? `${pathname}?page=${page - 1}`
                  : `${pathname}?page=${page}&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
              }
            />
          </PaginationItem>
          {totalPage.map((numberPage, index) => (
            <PaginationItem
              key={index}
              // onClick={(e) => {
              //   e.preventDefault();
              //   handleClick(numberPage);
              // }}
            >
              <PaginationLink
                className='hover:bg-white cursor-pointer'
                isActive={active === numberPage}
                href={
                  !(
                    (qSearch && qSearch !== 'undefined') ||
                    (qDate && qDate !== 'undefined') ||
                    (qSort && qSort !== 'undefined') ||
                    (qCity && qCity !== 'undefined')
                  )
                    ? `${pathname}?page=${numberPage - 1}`
                    : `${pathname}?page=${
                        numberPage - 1
                      }&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
                }
              >
                {numberPage}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className='hover:bg-white cursor-pointer'
              // onClick={handleNext}
              href={
                qSearch || qDate || qSort !== '' || qCity !== ''
                  ? `${pathname}?page=${page + 1}`
                  : `${pathname}?page=${page + 1}&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='hover:bg-white cursor-pointer'
            href={
              !(qSearch || qDate || qSort !== '' || qCity !== '')
                ? `${pathname}?page=${page - 1}`
                : `${pathname}?page=${page}&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
            }
          />
        </PaginationItem>
        {totalPage
          .slice(
            indexPage,
            totalPage[indexPage + 3] > totalPage[totalPage.length - 3]
              ? indexPage + (totalPage.length % 3)
              : indexPage + 3
          )
          .map((numberPage, index) => (
            <PaginationItem
              key={index}
              // onClick={(e) => {
              //   e.preventDefault();
              //   handleClick(numberPage);
              // }}
            >
              <PaginationLink
                className='hover:bg-white cursor-pointer'
                isActive={active === numberPage}
                href={
                  !(qSearch || qDate || qSort !== '' || qCity !== '')
                    ? `${pathname}?page=${numberPage - 1}`
                    : `${pathname}?page=${
                        numberPage - 1
                      }&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
                }
              >
                {numberPage}
              </PaginationLink>
            </PaginationItem>
          ))}
        {!(totalPage[indexPage + 3] >= totalPage[totalPage.length - 3]) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPage.slice(totalPage.length - 3, totalPage.length).map((numberPage, index) => (
          <PaginationItem
            key={index}
            // onClick={(e) => {
            //   e.preventDefault();
            //   handleClick(numberPage);
            // }}
          >
            <PaginationLink
              className='hover:bg-white cursor-pointer'
              isActive={active === numberPage}
              href={
                !(qSearch || qDate || qSort !== '' || qCity !== '')
                  ? `${pathname}?page=${numberPage - 1}`
                  : `${pathname}?page=${
                      numberPage - 1
                    }&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
              }
            >
              {numberPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className='hover:bg-white cursor-pointer'
            href={
              !(qSearch || qDate || qSort !== '' || qCity !== '')
                ? `${pathname}?page=${page + 1}`
                : `${pathname}?page=${page + 1}&&qDate=${qDate}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
