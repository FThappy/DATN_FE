"use client"
import React, { ChangeEvent } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import { vi } from "date-fns/locale";
type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  time : number;
  setTime : React.Dispatch<React.SetStateAction<number>>;
  detail : string;
};

const FormInputDateEvent = (props: Props) => {

  const {date ,setDate , time , setTime , detail} = props;

  return (
    <div className="flex w-full items-center gap-2 mt-2">
      {" "}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex border-2 border-gray-400 bg-white items-center h-[4rem]  gap-2 rounded-[12px] p-2 px-4  w-1/2">
            <FaCalendarAlt size={24} color="gray" />
            <div className="flex flex-col gap-1 ml-2 items-start">
              <p className="text-[0.8rem]">{detail}</p>
              <p className="    ">
                {" "}
                {format(date, "dd 'Tháng' MM, yyyy", {
                  locale: vi,
                })}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[1005]" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setTime(date.getTime());
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="w-1/2 p-2 px-4 border-2 border-gray-400 rounded-[12px] h-[4rem] flex flex-col ">
        <p className="text-[0.8rem]">Thời gian bắt đầu</p>
        <input
          type="time"
          id="timeStart"
          name="timeStart"
          className="p-2 outline-none	"
          value={format(time, "HH:mm")}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const timeString = e.target.value;
            const [hours, minutes] = timeString.split(":").map(Number);
            setDate((date) => {
              date.setHours(hours, minutes, 0, 0);
              return date;
            });
            setTime(date.getTime());
          }}
        />
      </div>
    </div>
  );
}

export default FormInputDateEvent;