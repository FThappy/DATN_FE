import { searchRoom } from "@/actions/searchRoom";
import MessageCard from "@/components/MessageCard";
import { Skeleton } from "@/components/ui/skeleton";
import { CardRoom } from "@/utils/typeMess";
import React, { ChangeEvent, FormEvent } from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  listRoom: CardRoom[];
  setListRoom: React.Dispatch<React.SetStateAction<CardRoom[]>>;
  end: boolean;
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;
  totalNewMess: number;
  setTotalNewMess: React.Dispatch<React.SetStateAction<number>>;
  active: CardRoom | undefined;
  setActive: React.Dispatch<React.SetStateAction<CardRoom | undefined>>;
  qSearch: string;
  setQSearch: React.Dispatch<React.SetStateAction<string>>;
  pendingSearch: boolean;
  setPendingSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

const SideMessLeft = (props: Props) => {
  const {
    listRoom,
    setListRoom,
    end,
    setEnd,
    totalNewMess,
    setTotalNewMess,
    active,
    setActive,
    qSearch,
    setQSearch,
    pendingSearch,
    setPendingSearch,
    handleSearch
  } = props;


  return (
    <div className="w-[22%] laptop:h-[39.5rem] flex flex-col p-2 border-r-gray-300 border-r-2 desktop:[53rem]">
      <div className="flex w-full">
        <p className="text-[1.5rem] font-bold">Đoạn chat</p>
      </div>
      <form
        onSubmit={handleSearch}
        className="flex py-2 bg-gray-300 rounded-[12px] mb-1"
      >
        <button
          type="submit"
          className="w-[3rem] h-[2rem]  flex items-center justify-center outline-none"
        >
          <IoIosSearch size={28} />
        </button>
        <input
          type="text"
          className="h-[2rem] w-[20rem] p-2 text-[1.1rem] bg-inherit outline-none"
          placeholder="Tìm kiếm......"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setQSearch(e.target.value);
          }}
        />
      </form>
      <div className="flex flex-col gap-1 ">
        {!pendingSearch ? (
          <div className="flex flex-col max-h-[85%]  overflow-y-auto">
            {listRoom && listRoom.length > 0
              ? listRoom.map((item, index) => (
                  <div key={index} onClick={(e)=>{
                    e.preventDefault();
                    setActive(item)
                  }}>
                    <MessageCard
                      item={item}
                      index={index}
                      key={index}
                      totalNewMess={totalNewMess}
                      setTotalNewMess={setTotalNewMess}
                    />
                  </div>
                ))
              : !end && (
                  <>
                    <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
                    <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
                    <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
                  </>
                )}
          </div>
        ) : (
          <>
            <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
            <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
            <Skeleton className="w-full h-[3rem] rounded-[8px] mb-1 mt-1" />
          </>
        )}
      </div>
    </div>
  );
};

export default SideMessLeft;
