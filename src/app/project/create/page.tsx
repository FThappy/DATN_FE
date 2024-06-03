"use client"
import DateInputProject from "@/components/project/DateInputProject";
import { cityDummy } from "@/lib/placeholder-data";
import React, { ChangeEvent, useState } from "react";

type Props = {};

const Page = (props: Props) => {

  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="flex flex-col gap-1 items-center bg-[#f1eff4d1] mb-4">
      <p className="text-[1.5rem] font-bold">Tạo dự án từ thiện cho bạn</p>
      <form className="flex flex-col gap-1 items-center">
        <div className="flex flex-col gap-1">
          <label htmlFor="nameProject" className="font-medium">
            Tên dự án của bạn :
          </label>
          <input
            name="nameProject"
            id="nameProject"
            className="p-2 w-[45rem] h-[2rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
            placeholder="Nhập tên dự án của bạn...."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Miêu tả :
          </label>
          <textarea
            name="description"
            id="description"
            className="p-2 w-[45rem] h-[5rem] min-h-[5rem] max-h-[5rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
            placeholder="Miêu tả nội dung..."
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="font-medium">
              Địa điểm hoạt động chính :
            </label>
            <select
              id="city"
              name="city"
              className="p-2 w-[22rem] h-[2.5rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
              //   onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              //     setCity(e.target.value);
              //   }}
              //   defaultValue={""}
            >
              <option value="" disabled hidden>
                Địa điểm hoạt động chính
              </option>
              {cityDummy.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="font-medium">
              Thời gian kết thúc :
            </label>
            <DateInputProject date={date} setDate={setDate}/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
