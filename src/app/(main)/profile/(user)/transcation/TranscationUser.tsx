import { getTranscation } from "@/actions/getTranscation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toastifyUtils from "@/utils/toastify";
import { TranscationProps } from "@/utils/typeTranscation";
import React, { ChangeEvent, useEffect, useState } from "react";
import RowTranscation from "./RowTranscation";
import RowTranscationSkeleton from "@/components/RowTranscationSkeleton";
import { IoIosSearch } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { searchTranscation } from "@/actions/searchTranscation";

type Props = {};
const TranscationUser = (props: Props) => {
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [endTranscation, setEndTranscation] = useState(false);

  const [listTranscation, setListTranscation] = useState<TranscationProps[]>(
    []
  );
  const router = useRouter();

  const searchParams = useSearchParams();

  const pSearch = searchParams.get("qSearch");

  const pDate = searchParams.get("qDate");


  const [date, setDate] = useState<Date | undefined>(
    pDate && pDate !== "undefined" ? new Date(pDate as string) : undefined
  );

  const [textSearch, setTextSearch] = useState<string>(
    pSearch && pSearch !== "undefined" ? pSearch : ""
  );


  const getListTranscation = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await getTranscation(page);
      if (res.code === 4) {
        setIsLoading(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 10) {
        setIsLoading(false);
        setEndTranscation(true);
      }
      if (res.code === 0) {
        setIsLoading(false);
        setListTranscation((prevTranscation) => [
          ...prevTranscation,
          ...res.data,
        ]);
        setPage(page + 1);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const getListTranscationSearch = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await searchTranscation(pSearch, pDate, page);
      if (res.code === 4) {
        setIsLoading(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.listTranscation.length < 10) {
        setIsLoading(false);
        setEndTranscation(true);
      }
      if (res.code === 0) {
        setIsLoading(false);
        setListTranscation((prevTranscation) => [
          ...prevTranscation,
          ...res.listTranscation,
        ]);
        setPage(page + 1);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const handleLoadMore = async () => {
    if (
      (pSearch && pSearch !== "undefined") ||
      (pDate && pDate !== "undefined") 
    ) {
      console.log("11");

      getListTranscationSearch();
    } else {
      console.log("22");

      getListTranscation();
    }
  };

  const handlePushParams = (
    date: Date | undefined,
    textSearch: string | undefined,
  ) => {
    router.push(
      `/profile/transcation?qDate=${date}&&qSearch=${textSearch}`
    );
  };

  useEffect(() => {
    if (
      (pSearch && pSearch !== "undefined") ||
      (pDate && pDate !== "undefined")
    ) {
      console.log("1");
      getListTranscationSearch();
    } else {
      console.log("2");
      getListTranscation();
    }
  }, [pDate,  pSearch]);

  return (
    <div className="p-2 w-full ">
      <div className="shadow-beautiful w-full h-screen flex flex-col bg-white rounded-[8px]">
        <div className="flex justify-between p-4 px-8">
          <form
            className="flex shadow-beautiful bg-white items-center justify-center rounded-[12px] p-2"
            onSubmit={(e) => {
              e.preventDefault();
              handlePushParams(date, textSearch);
              setPage(0);
              setListTranscation([]);
              setEndTranscation(false);
            }}
          >
            <IoIosSearch size={24} color="gray" />
            <input
              type="text"
              name=""
              id=""
              className="outline-none px-2 white"
              placeholder="Tên dự án........"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTextSearch(e.target.value);
              }}
            />
          </form>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    <div className="flex justify-between w-[210px]">
                      {format(date, "dd/MM/yyyy")}
                      <AiOutlineCloseCircle
                        onClick={() => {
                          setDate(undefined);
                          handlePushParams(undefined, textSearch);
                          setPage(0);
                          setListTranscation([]);
                          setEndTranscation(false);
                        }}
                      />
                    </div>
                  ) : (
                    <span>Chọn ngày chuyển khoản</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    handlePushParams(date!, textSearch);
                    setPage(0);
                    setListTranscation([]);
                    setEndTranscation(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {/* <select
              className="flex shadow-beautiful bg-white items-center justify-center gap-2 rounded-[12px] p-2 "
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                e.preventDefault();
                setSort(e.target.value);
                handlePushParams(date, textSearch, e.target.value);
                setPage(0);
                setListTranscation([]);
                setEndTranscation(false);
              }}
              defaultValue={pSort!}
            >
              <option value="" disabled hidden>
                Số tiền tăng dần
              </option>
              <option value="asc">Số tiền tăng dần</option>
              <option value="desc">Số tiền giảm dần </option>
            </select> */}
          </div>
        </div>
        <div className="h-[80%] w-full px-8 pt-1 flex flex-col items-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%] text-[1.5rem] ">STT</TableHead>
                <TableHead className="text-[1.5rem]  w-[35%]">
                  Số tiền đã chuyển
                </TableHead>
                <TableHead className="text-[1.5rem]  w-[35%]">
                  Tên dự án từ thiện
                </TableHead>
                <TableHead className="text-right text-[1.5rem] w-[20%]">
                  Ngày chuyển tiền
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listTranscation.map((transcation, index) => (
                <RowTranscation
                  index={index}
                  transcation={transcation}
                  key={index}
                />
              ))}
              {isLoading && (
                <>
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                  <RowTranscationSkeleton />
                </>
              )}
            </TableBody>
          </Table>
          <div className="border-slate-300 w-full h-[10px] border-t-[1px]"></div>
          {!endTranscation ? (
            <button
              className="flex items-center justify-center font-bold bg-red hover:bg-green  text-white p-2 mt-2 mb-2"
              onClick={handleLoadMore}
            >
              - Tải thêm giao dịch -
            </button>
          ) : (
            <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
              {/* - Đã hết giao dịch - */}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscationUser;
