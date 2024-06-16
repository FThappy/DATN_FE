import { getTranscation } from "@/actions/getTranscation";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import toastifyUtils from "@/utils/toastify";
import { TranscationProps } from "@/utils/typeTranscation";
import React, { useEffect, useState } from "react";
import RowTranscation from "./RowTranscation";
import RowTranscationSkeleton from "@/components/RowTranscationSkeleton";

type Props = {};
const TranscationUser = (props: Props) => {

  const [page , setPage] = useState(0)

  const [isLoading , setIsLoading] = useState(false)

  const [endTranscation , setEndTranscation] = useState(false)

  const [listTranscation , setListTranscation] = useState<TranscationProps[]>([])

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
        setListTranscation((prevTranscation) => [...prevTranscation, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const handleLoadMore = async ()=>{
    getListTranscation()
  }

  useEffect(() => {
    getListTranscation()
  },[])

  return (
    <div className="p-2 w-full ">
      <div className="shadow-beautiful w-full h-screen flex flex-col bg-white rounded-[8px]">
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
              - Đã hết giao dịch -
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscationUser;
