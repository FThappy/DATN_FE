import React, { useEffect } from "react";
import RepCommentCard from "./RepCommentCard";
import { CommentProps } from "@/utils/typeComment";
import { socket } from "@/utils/requestMethod";

type Props = {
  newRepComments: Omit<CommentProps, "repLength">[];
  setNewRepComments: React.Dispatch<
    React.SetStateAction<Omit<CommentProps, "repLength">[]>
  >;
  commentId: string;
  handleSetRepUser: (user: string, commentId: string, toUserId: string) => void;
};

const ListNewRepComment = (props: Props) => {
  const { newRepComments, setNewRepComments, commentId , handleSetRepUser } = props;

  useEffect(() => {
    const handleNewComment = (newComment: Omit<CommentProps, "repLength">) => {
      if (commentId === newComment.itemId) {
        setNewRepComments((prevComments) => [...prevComments, newComment]);
      }
    };
    socket.on("new-rep-comment", handleNewComment);

    return () => {
      socket.off("new-rep-comment");
    };
  }, [commentId]);



  return (
    <div className=" flex flex-col border-r-4 border-sky-400 gap-2 px-2 mb-2">
      {" "}
      {newRepComments.length > 0 &&
        newRepComments.map((repComment, index) => (
          <div className="w-full relative" key={index}>
            <RepCommentCard
              comment={repComment}
              index={index}
              commentFatherId={commentId}
              type="new"
              handleSetRepUser={handleSetRepUser}
            />
            <div className="flex absolute w-full left-[-58px] top-[-75px] rounded-full items-end z-40">
              <div className=" border-slate-300 w-[1rem] h-[6rem] border-r-[2px] "></div>
              <div className=" border-slate-300 w-[2.2rem] h-[1px] border-t-[2px] "></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListNewRepComment;
