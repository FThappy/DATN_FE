import React, { ChangeEvent } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { Calendar } from './ui/calendar';
import { cityDummy } from '@/lib/placeholder-data';
import { Id } from 'react-toastify';

type Props = {
  qSearch: string | undefined;
  qDate: Date | undefined;
  qSort: string;
  qCity: string;
  page: number;
  setQSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setQDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setQSort: React.Dispatch<React.SetStateAction<string>>;
  setQCity: React.Dispatch<React.SetStateAction<string>>;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (page: number) => Promise<Id | undefined>;
  handlePushParams: (qDate: Date | undefined, qSearch: string | undefined, qSort: string, qCity: string) => void;
};

const SearchContainer = (props: Props) => {
  const {
    setQSearch,
    setQDate,
    setQSort,
    setQCity,
    qDate,
    page,
    setIsSearch,
    handleSearch,
    qSearch,
    qCity,
    qSort,
    handlePushParams
  } = props;

  return (
    <div className='flex justify-between w-full  mt-2'>
      <form
        className='flex shadow-beautiful bg-white items-center justify-center rounded-[12px] p-2'
        onSubmit={e => {
          e.preventDefault();
          handlePushParams(qDate, qSearch, qSort, qCity);
          handleSearch(page);
        }}
      >
        <IoIosSearch size={24} color='gray' />
        <input
          type='text'
          name=''
          id=''
          className='outline-none px-2 white'
          placeholder='Tìm kiếm sự kiện........'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQSearch(e.target.value);
          }}
        />
      </form>
      <div className='flex gap-2'>
        <input type='date' name='dateEvent' id='dateEvent' className='hidden' />
        <Popover>
          <PopoverTrigger asChild>
            {!qDate ? (
              <button className='flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 px-4'>
                <FaCalendarAlt size={24} />
                <p>Ngày tổ chức sự kiện</p>
              </button>
            ) : (
              <div className='flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 px-4 w-[10rem]'>
                {' '}
                {format(qDate, 'dd/MM/yyyy')}
                <AiOutlineCloseCircle
                  onClick={() => {
                    setQDate(undefined);
                    handlePushParams(undefined, qSearch, qSort, qCity);
                  }}
                />
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={qDate}
              onSelect={date => {
                setQDate(date);
                handlePushParams(date, qSearch, qSort, qCity);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <select
          className='flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 '
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            setQCity(e.target.value);
            handlePushParams(qDate, qSearch, qSort, e.target.value);
          }}
          defaultValue={qCity}
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
