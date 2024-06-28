import { ProjectProps } from "@/utils/typeProject";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";
import { FaComments } from "react-icons/fa6";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";
import { socket } from "@/utils/requestMethod";
import toastifyUtils from "@/utils/toastify";
import CommentProjectContainer from "../CommentProjectContainer";
import { CommentProps } from "@/utils/typeComment";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
type userProps = {
  id: string;
  img: string;
  username: string;
};

type Props = {
  user: userProps;
  project: ProjectProps;
};

const ProjectCommentContainer = (props: Props) => {
  const { user, project } = props;

  const [content, setContent] = useState<string>();

  const [commentId, setCommentId] = useState<string>();

  const [repUser, setRepUser] = useState<string>();

  const [toUserId, setToUserId] = useState<string>();

  const [comments, setComments] = useState<CommentProps[]>([]);

  
    const [openEmo, setOpenEmo] = useState<boolean>(false);

    const handleSubmit = async (
      event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
    ) => {
      event.preventDefault();
      if (!content) {
        toastifyUtils("error", "Bình luận không được để trống");
        return;
      }
      try {
        socket.emit("send-comment", project._id, user.id, content , "project");
        setContent("");
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    const handleEmojiSelect = (emoji: any) => {
      setContent((prev) => (prev ? prev + emoji.native : emoji.native)); // Thêm emoji vào nội dung hiện tại của textarea
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

    // const handleLeaveRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    //   setOpen(false);
    //   socket.emit("leave-room", post._id);
    // };

    const handleSetRepUser = (
      user: string,
      commentId: string,
      toUserId: string
    ) => {
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
        socket.emit("rep-comment", commentId, content, toUserId,  "project");
        setContent("");
        setRepUser("");
        setCommentId("");
        setToUserId("");
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
  return (
    <div className="w-full  shadow-beautiful rounded-[0.5rem]	bg-white p-2 mt-4 mb-2 max-h-[50rem] overflow-y-scroll">
      <div className="flex w-full gap-2 mb-2">
        <FaComments size={24} />
        <p className="text-left text-[1.5rem] font-medium text-black">
          Bình luận :
        </p>
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
          {openEmo && (
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              onClickOutside={(e: any) => {
                e.preventDefault();
                setOpenEmo(false);
              }}
            />
          )}
          {!openEmo && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenEmo(true);
              }}
            >
              <MdOutlineEmojiEmotions size={24} />
            </button>
          )}
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
      <CommentProjectContainer
        project={project}
        comments={comments}
        setComments={setComments}
        handleSetRepUser={handleSetRepUser}
      />
    </div>
  );
};

export default ProjectCommentContainer;
