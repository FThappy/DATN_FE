import React, { ChangeEvent } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format, parseISO } from 'date-fns';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { Calendar } from './ui/calendar';
import { cityDummy } from '@/lib/placeholder-data';
import { Id } from 'react-toastify';
import { debounce } from 'lodash';
import { removeQueryParam, updateQueryParam } from '@/utils/helper';

type Props = {
  pDate?: string | null;
  pCity?: string | null;
};
const SearchContainer = (props: Props) => {
  const { pDate, pCity } = props;
  const handleChangeTextField = debounce((value: string) => {
    updateQueryParam('qSearch', value);
  }, 1000);
  return (
    <div className='flex justify-between w-full  mt-2'>
      <div className='flex shadow-beautiful bg-white items-center justify-center rounded-[12px] p-2'>
        <IoIosSearch size={24} color='gray' />
        <input
          type='text'
          name=''
          id=''
          className='outline-none px-2 white'
          placeholder='Tìm kiếm sự kiện........'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChangeTextField(e.target.value);
          }}
        />
      </div>
      <div className='flex gap-2'>
        <input type='date' name='dateEvent' id='dateEvent' className='hidden' />
        <Popover>
          <PopoverTrigger asChild>
            {!pDate ? (
              <button className='flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 px-4'>
                <FaCalendarAlt size={24} />
                <p>Ngày tổ chức sự kiện</p>
              </button>
            ) : (
              <div className='flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 px-4 w-[10rem]'>
                {' '}
                {format(new Date(pDate as string), 'dd/MM/yyyy')}
                <AiOutlineCloseCircle
                  onClick={() => {
                    removeQueryParam('qDate');
                  }}
                />
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={pDate ? parseISO(pDate) : undefined}
              onSelect={date => {
                if (date) {
                  updateQueryParam('qDate', format(date, 'yyyy-MM-dd'));
                } else {
                  removeQueryParam('qDate');
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <select
          className='flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 '
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            updateQueryParam('qCity', e.target.value);
          }}
          defaultValue={pCity || ''}
        >
          <option value=''>Tất cả các tỉnh</option>
          {cityDummy.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchContainer;
