'use client';
import { cityDummy } from '@/lib/placeholder-data';
import React, { ChangeEvent } from 'react';
import { IoIosSearch } from 'react-icons/io';
import TypeInputProjectSearch from './TypeInputProjectSearch';
import { debounce } from 'lodash';
import { updateQueryParam } from '@/utils/helper';
type Props = {
  setPageSearch: React.Dispatch<React.SetStateAction<number>>;
};

const SearchProjectContainer = (props: Props) => {
  const { setPageSearch } = props;
  const handleChangeTextField = debounce((value: string) => {
    updateQueryParam('qSearch', value);
  }, 1000);
  return (
    <div className='flex justify-between w-full  mt-2'>
      <div className='flex shadow-beautiful h-[2.5rem] bg-white items-center justify-center rounded-[12px] p-2'>
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
        <TypeInputProjectSearch width={35} />
        <select
          className='flex shadow-beautiful h-[2.5rem] bg-white items-center justify-center gap-2 rounded-[12px] p-2 '
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            updateQueryParam('qCity', e.target.value);
            setPageSearch(0);
          }}
        >
          <option value=''>Tất cả các tỉnh</option>
          {cityDummy.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className='flex shadow-beautiful h-[2.5rem] bg-white items-center justify-center gap-2 rounded-[12px] p-2 '
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            updateQueryParam('qSort', e.target.value);
            setPageSearch(0);
          }}
        >
          <option value='' disabled hidden>
            Ngày đăng sự kiện giảm dần
          </option>
          <option value='new'>Ngày đăng sự kiện giảm dần</option>
          <option value='old'>Ngày đăng sự kiện tăng dần </option>
        </select>
      </div>
    </div>
  );
};

export default SearchProjectContainer;
