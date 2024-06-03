import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

type Props = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const DateInputProject = (props: Props) => {

  const { date, setDate } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex border-2 border-gray-400 bg-white items-center h-[2.5rem]  gap-2 rounded-[8px] p-2 px-4  w-[22rem]">
          <FaCalendarAlt size={24} color="gray" />
          <div className="flex flex-col gap-1 ml-2 items-start">
            {date ? (
              <p className="text-[1rem]">
                {format(date, "dd 'Tháng' MM, yyyy", { locale: vi })}
              </p>
            ) : (
              <p className="text-[1rem]">Ngày kết thúc</p>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[1005]" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateInputProject