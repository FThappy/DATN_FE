import { getUserPublic } from "@/actions/getInfoUserPublic";
import toastifyUtils from "@/utils/toastify";
import { CommentProps } from "@/utils/typeComment";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CommentSkeleton from "./CommentSkeleton";
import { differenceInDays, differenceInHours } from "date-fns";
import { timeSend } from "@/utils/timeSend";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { socket } from "@/utils/requestMethod";
import { userStore } from "@/store/userStore";

type Props = {
  comment: CommentProps;
  setComment: React.Dispatch<React.SetStateAction<CommentProps[]>>;
  index: number;
  postId: string;
  type: string;
};

type Commenter = {
  _id: string;
  username: string;
  img: string;
};

// eslint-disable-next-line react/display-name
const CommentCard = React.memo((props: Props) => {
  const [commenter, setCommenter] = useState<Commenter>();

  const user = userStore((state: any) => state?.user);

  const [isChange, setIsChange] = useState(false);

  const { comment, setComment, index, postId, type } = props;

  const [detail, setDetail] = useState(comment.detail);

  const getPoster = async (): Promise<void> => {
    try {
      const res = await getUserPublic(comment.userId);
      if (res.code === 3) {
        toastifyUtils("error", "Không tồn tại người dùng");
      }
      setCommenter(res.data);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    if (comment.userId) {
      getPoster();
    }
  }, [comment.userId]);

  const handleChangeComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      socket.emit("change-comment", comment._id, detail, postId, user.id);
      setDetail("");
      setIsChange(false);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  const handleDeleteComment = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      socket.emit("delete-comment", comment._id, user.id, postId);
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };



  return (
    <>
      {commenter ? (
        <div className="flex gap-2 w-full">
          <div className="h-10 w-10 rounded-full  flex justify-center items-center ">
            <img
              src={commenter?.img ? commenter?.img : "/twitter.png"}
              alt="logo-user"
              loading="lazy"
              className="cursor-pointer rounded-full w-full h-full"
            />
          </div>
          {isChange ? (
            <form
              onSubmit={handleChangeComment}
              className="flex flex-col w-full bg-gray-200 rounded-[8px]"
            >
              <textarea
                className="outline-none	bg-white/0 h-[3.5rem] min-h-[3.5rem] max-h-[3.5rem] p-2 text-[1rem]"
                placeholder="Viết bình luận..."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setDetail(e.target.value);
                }}
                value={detail}
              />
              <button
                type="submit"
                className="flex justify-end items-center h-full"
                disabled={detail !== comment.detail ? false : true}
              >
                <PiPaperPlaneRightFill
                  color={detail !== comment.detail ? "#1E90FF" : "gray"}
                  className="mr-2"
                  size={20}
                />
              </button>
            </form>
          ) : (
            <div className="flex flex-col w-full">
              <div className="flex flex-col  bg-gray-200 w-full p-1 px-2 rounded-[8px]">
                <Link href={`/profile/${commenter?._id}`} className="font-bold">
                  {commenter?.username}
                </Link>
                <p className="">{comment.detail}</p>
              </div>
              <div className="flex w-full justify-between  px-2 mt-1">
                <p className="text-gray-400"> {timeSend(comment.createdAt)}</p>
                {user.id === comment.userId && (
                  <div className="flex gap-3">
                    <button
                      className="font-bold text-gray-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsChange(true);
                        setDetail(comment.detail);
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button className="font-bold text-gray-600" onClick={handleDeleteComment}>Xóa</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <CommentSkeleton />
      )}
    </>
  );
});

export default CommentCard;
