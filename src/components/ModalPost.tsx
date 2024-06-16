import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentCustom,
  DialogTrigger,
} from "./ui/dialog";
import { BiLike, BiSolidPencil } from "react-icons/bi";
import Image from "next/image";
import { FaRegComment, FaTrashCan } from "react-icons/fa6";
import { PostProps } from "@/utils/typePost";
import { differenceInDays, differenceInHours } from "date-fns";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import Readmore from "./utils/Readmore";
import ImageGroup from "./utils/ImageGroup";
import { PiShareFatLight } from "react-icons/pi";
import CommentPostContainer from "./CommentPostContainer";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { CommentProps } from "@/utils/typeComment";
import { socket } from "@/utils/requestMethod";
import { TiDelete } from "react-icons/ti";

type Props = {
  post: PostProps;
  userName: string | undefined;
  userImg: string | undefined;
  userId: string | undefined;
  displayName: string | undefined;
};

const ModalPost = (props: Props) => {
  const { post, userName, userImg, userId , displayName } = props;

  const [open, setOpen] = useState(false);

  const user = userStore((state: any) => state?.user);

  const [openPopover, setOpenPopover] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [pending, setPending] = useState(false);

  const [content, setContent] = useState<string>();

  const [comments, setComments] = useState<CommentProps[]>([]);

  const [commentId, setCommentId] = useState<string>();

  const [repUser, setRepUser] = useState<string>();

  const [toUserId , setToUserId] = useState<string>();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (!content) {
      toastifyUtils("error", "Bình luận không được để trống");
      return;
    }
    try {
      socket.emit("send-comment", post._id, user.id, content);
      setContent("");
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  useEffect(() => {
    socket.off("error-global").on("error-global", (error) => {
      console.log(error);
      toastifyUtils("error", error.msg);
    });

    return () => {
      socket.off("error-global");
    };
  }, []);

  const handleLeaveRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(false);
    socket.emit("leave-room", post._id);
  };

  const handleSetRepUser = (user: string, commentId: string , toUserId : string) => {
    setRepUser(user);
    setCommentId(commentId);
    setToUserId(toUserId);
  };

  const handleRepComment = async (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (!content) {
      toastifyUtils("error", "Bình luận không được để trống");
      return;
    }
    try {
      socket.emit("rep-comment", commentId, content , toUserId);
      setContent("");
      setRepUser("");
      setCommentId("");
      setToUserId("")
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-full">
            <FaRegComment size={28} color={"#9ca3af"} />
            <p className="text-gray-400 font-bold text-[1rem] ">Bình Luận</p>
          </div>
        </DialogTrigger>
        <DialogContent
          className="w-[45rem] h-auto shadow-beautiful rounded-[0.5rem]	bg-white p-0 m-0"
          onInteractOutside={(e) => {
            e.preventDefault();
            setOpen(false);
            socket.emit("leave-room", post._id);
          }}
        >
          <div className="pt-1 flex items-center w-full justify-center relative">
            {userName && (
              <p className="text-[1.5rem] font-bold">Bài viết của {userName}</p>
            )}
            <DialogClose asChild>
              <button
                className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[40px] 
          h-[40px] absolute right-2 cursor-pointer bottom-[-8px]"
                onClick={handleLeaveRoom}
              >
                <div className="flex items-center justify-center w-[25px] h-[25px]">
                  <Image
                    src="/reject.png"
                    alt="logo-user"
                    loading="lazy"
                    height={10}
                    width={30}
                    className=" rounded-full  h-full"
                  />
                </div>
              </button>
            </DialogClose>
          </div>
          <div className="border-slate-300 w-full h-[1px] border-t-[1px]"></div>
          <div className="flex flex-col items-center w-full max-h-[32rem] overflow-y-scroll">
            <div className="flex items-center w-full px-4 pb-1 justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full  flex justify-center items-center ">
                  <img
                    src={userImg ? userImg : "/twitter.png"}
                    alt="logo-user"
                    loading="lazy"
                    // height={80}
                    // width={80}
                    className="cursor-pointer rounded-full w-full h-full"
                  />
                </div>
                <div className=" ml-2 ">
                  <p className=" w-[250px] font-bold cursor-pointer">
                    {displayName ? displayName : userName}
                  </p>
                  <p className=" w-[200px] text-gray-400 cursor-pointer">
                    {differenceInHours(new Date(), new Date(post.createdAt)) <=
                    0
                      ? "Vài phút trước"
                      : differenceInHours(
                          new Date(),
                          new Date(post.createdAt)
                        ) >= 24
                      ? differenceInDays(new Date(), new Date(post.createdAt)) +
                        " ngày trước"
                      : differenceInHours(
                          new Date(),
                          new Date(post.createdAt)
                        ) + "h"}
                  </p>
                </div>
              </div>
            </div>
            {post.document && <Readmore documentation={post.document} />}
            <div className="w-full">
              {post.img.length > 0 && <ImageGroup listUrl={post.img} />}
            </div>
            <div className="flex items-center gap-2 mt-1 px-4 w-full">
              <Image
                src="/like.png"
                alt="like"
                loading="lazy"
                height={20}
                width={20}
                className="cursor-pointer"
              />
              <p className=" w-[200px] text-gray-400 cursor-pointer">100</p>
            </div>
            <div className="px-4 w-full ">
              <div className=" border-slate-300 w-full h-[1px] border-t-[1px] mt-[0.65rem] mb-1 "></div>
            </div>
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-1/3">
                <BiLike size={28} color={"#9ca3af"} />
                <p className="text-gray-400 font-bold text-[1rem]">Thích</p>
              </div>
              <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-1/3">
                <FaRegComment size={28} color={"#9ca3af"} />
                <p className="text-gray-400 font-bold text-[1rem] ">
                  Bình Luận
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 rounded-[10px] p-2 w-1/3">
                <PiShareFatLight size={28} color={"#9ca3af"} />
                <p className="text-gray-400 font-bold text-[1rem]">Chia Sẻ</p>
              </div>
            </div>
            <div className="px-4 w-full ">
              <div className=" border-slate-300 w-full h-[1px] border-t-[1px] mt-[0.65rem] "></div>
            </div>
            <CommentPostContainer
              post={post}
              comments={comments}
              setComments={setComments}
              handleSetRepUser={handleSetRepUser}
            />
          </div>
          <div className="flex w-full gap-2 p-1 px-2 pr-4 h-auto pt-0">
            <div className="h-10 w-10 rounded-full  flex justify-center items-center ">
              <img
                src={user?.img ? user.img : "/twitter.png"}
                alt="logo-user"
                loading="lazy"
                className="cursor-pointer rounded-full w-full h-full"
              />
            </div>
            <form
              onSubmit={(e) => {
                if (!repUser) {
                  handleSubmit(e);
                } else {
                  handleRepComment(e);
                }
              }}
              className="flex flex-col w-full bg-gray-200 rounded-[8px] h-auto"
            >
              {repUser && (
                <div className="flex w-full justify-between px-2 pt-1 ">
                  <p>
                    Trả lời <span className="font-medium">{repUser}</span> :
                  </p>
                  <TiDelete
                    className="cursor-pointer"
                    size={24}
                    onClick={(e) => {
                      e.preventDefault();
                      setRepUser("");
                    }}
                  />
                </div>
              )}
              <textarea
                className="outline-none	bg-white/0 h-[4rem] min-h-[4rem] max-h-[4rem] p-2 text-[1rem]"
                placeholder="Viết bình luận..."
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setContent(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (!repUser) {
                      handleSubmit(e);
                    } else {
                      handleRepComment(e);
                    }
                    e.currentTarget.value = "";
                  }
                }}
                value={content}
              />
              <button
                type="submit"
                className="flex justify-end items-center h-full my-1"
                disabled={content ? false : true}
              >
                <PiPaperPlaneRightFill
                  color={content ? "#1E90FF" : "gray"}
                  className="mr-2"
                  size={20}
                />
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPost;
