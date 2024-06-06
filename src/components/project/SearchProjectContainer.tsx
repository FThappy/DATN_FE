"use client";
import { cityDummy, typeProjectDefault } from "@/lib/placeholder-data";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import TypeInputProject from "./TypeInputProject";
import { Id } from "react-toastify";
import TypeInputProjectSearch from "./TypeInputProjectSearch";

type Props = {
  qSearch: string | undefined;
  qType: string[] | undefined;
  qSort: string;
  qCity: string;
  setQSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setQType: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setQSort: React.Dispatch<React.SetStateAction<string>>;
  setQCity: React.Dispatch<React.SetStateAction<string>>;
  handlePushParams: (
    qType: string[] | undefined,
    qSearch: string | undefined,
    qSort: string,
    qCity: string,
    isQSearch: boolean
  ) => void;
  handleSearch: () => Promise<Id | undefined>;
  handleQSearch: (page: number) => Promise<Id | undefined>;
};

const SearchProjectContainer = (props: Props) => {
  const {
    setQSearch,
    setQType,
    setQSort,
    setQCity,
    qType,
    qSearch,
    qCity,
    qSort,
    handlePushParams,
    handleSearch,
    handleQSearch,
  } = props;

  useEffect(() => {
    if (qType && qType.length >= 0) {
      handlePushParams(qType, qSearch, qSort, qCity, false);
      handleQSearch(0);
    }
  }, [qType]);

  return (
    <div className="flex justify-between w-full  mt-2">
      <form
        className="flex shadow-beautiful h-[2.5rem] bg-white items-center justify-center rounded-[12px] p-2"
        onSubmit={(e) => {
          e.preventDefault();
          handlePushParams(qType, qSearch, qSort, qCity, true);
          handleQSearch(0);
        }}
      >
        <IoIosSearch size={24} color="gray" />
        <input
          type="text"
          name=""
          id=""
          className="outline-none px-2 white"
          placeholder="Tìm kiếm sự kiện........"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQSearch(e.target.value);
          }}
        />
      </form>
      <div className="flex gap-2">
        <TypeInputProjectSearch type={qType} setType={setQType} width={35} />
        <select
          className="flex shadow-beautiful h-[2.5rem] bg-white items-center justify-center gap-2 rounded-[12px] p-2 "
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            setQCity(e.target.value);
            handlePushParams(qType, qSearch, qSort, e.target.value, false);
          }}
          defaultValue={qCity}
        >
          <option value="">Tất cả các tỉnh</option>
          {cityDummy.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className="flex shadow-beautiful h-[2.5rem] bg-white items-center justify-center gap-2 rounded-[12px] p-2 "
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            e.preventDefault();
            setQSort(e.target.value);
            handlePushParams(qType, qSearch, e.target.value, qCity, false);
          }}
          defaultValue={qSort}
        >
          <option value="" disabled hidden>
            Ngày đăng sự kiện giảm dần
          </option>
          <option value="new">Ngày đăng sự kiện giảm dần</option>
          <option value="old">Ngày đăng sự kiện tăng dần </option>
        </select>
      </div>
    </div>
  );
};

export default SearchProjectContainer;
