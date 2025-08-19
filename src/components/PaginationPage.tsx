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
  totalPage: number[];
  getTotalPageEvent: () => Promise<Id | undefined>;
  active: number;
  page: number;
};

export function PaginationPage(props: Props) {
  const { totalPage, getTotalPageEvent, active, page } = props;

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

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();

    params.set('page', String(targetPage));

    if (qDate) params.set('qDate', qDate);
    if (qSearch) params.set('qSearch', qSearch);
    if (qSort) params.set('qSort', qSort);
    if (qCity) params.set('qCity', qCity);

    return `${pathname}?${params.toString()}`;
  };
  if (totalPage.length <= 6) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className='hover:bg-white cursor-pointer' href={buildHref(Math.max(page - 1, 0))} />
          </PaginationItem>
          {totalPage.map((numberPage, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className='hover:bg-white cursor-pointer'
                isActive={active === numberPage}
                href={buildHref(numberPage - 1)}
              >
                {numberPage}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext className='hover:bg-white cursor-pointer' href={buildHref(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className='hover:bg-white cursor-pointer' href={buildHref(Math.max(page - 1, 0))} />
        </PaginationItem>
        {totalPage
          .slice(
            indexPage,
            totalPage[indexPage + 3] > totalPage[totalPage.length - 3]
              ? indexPage + (totalPage.length % 3)
              : indexPage + 3
          )
          .map((numberPage, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className='hover:bg-white cursor-pointer'
                isActive={active === numberPage}
                href={buildHref(numberPage - 1)}
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
          <PaginationItem key={index}>
            <PaginationLink
              className='hover:bg-white cursor-pointer'
              isActive={active === numberPage}
              href={buildHref(numberPage - 1)}
            >
              {numberPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext className='hover:bg-white cursor-pointer' href={buildHref(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
