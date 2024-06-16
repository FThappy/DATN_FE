import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";
import CardUserDonate from "./CardUserDonate";
import toastifyUtils from "@/utils/toastify";
import { TranscationProps } from "@/utils/typeTranscation";
import { getUserDonate } from "@/actions/getListUserDonate";

type Props = {
  projectId: string;
};

const ListDonate = (props: Props) => {
  const { projectId } = props;

  const { ref, inView } = useInView();
  
  const [listUserDonate , setListUserDonate] = useState<TranscationProps[]>([]);

  const [page, setPage] = useState<number>(0);

  const [endListUserDonate, setEndListUserDonate] = useState<boolean>(true);

  const getListUserDonate = async (): Promise<void> => {
    try {
      const res = await getUserDonate(page, projectId);
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 10) {
        setEndListUserDonate(false);
      }
      if (res.code === 0) {
        console.log(res.data)
        setListUserDonate((prevPost) => [...prevPost, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    // Hàm để gọi listPost và cập nhật state posts
    if (inView) {
      getListUserDonate();
    }
  }, [inView]);
  return (
    <>
      {listUserDonate.map((item, index) => (
        <div className="w-full " key={index}>
          <CardUserDonate
            userId={item.userId}
            amount={item.amount}
            createdAt={item.createdAt}
          />
        </div>
      ))}
      {endListUserDonate ? (
        <div className="w-full flex flex-col gap-2" ref={ref}>
          <Skeleton className="w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
          <Skeleton className="w-full h-[60px] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
        </div>
      ) : (
        <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
          Đã hết giao dịch
        </p>
      )}
    </>
  );
};

export default ListDonate;
