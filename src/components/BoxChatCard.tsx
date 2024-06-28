import { socket } from "@/utils/requestMethod";
import toastifyUtils from "@/utils/toastify";
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import BoxChatHeader from "./BoxChatHeader";
import { UserPublic } from "@/utils/typeAuth";
import { MessageProp, Room } from "@/utils/typeMess";
import ChatContainer from "./ChatContainer";
import { Skeleton } from "./ui/skeleton";
import { getMessageForRoom } from "@/actions/getMessageForRoom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
type Props = {
  roomId: string;
  index: number;
  type: string;
  room: Room | undefined;
  listMessage: MessageProp[];
  setListMessage: React.Dispatch<React.SetStateAction<MessageProp[]>>;
  setRoom: React.Dispatch<React.SetStateAction<Room | undefined>>;
  end: boolean;
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserPublic | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoxChatCard = (props: Props) => {
  const {
    roomId,
    index,
    type,
    room,
    listMessage,
    setListMessage,
    setRoom,
    end,
    setEnd,
    user,
    isLoading,
    setIsLoading,
  } = props;

  const [content, setContent] = useState<string>();

  const [pending, setPending] = useState<boolean>(false);

  const [height, setHeight] = useState("2rem");

  const [numHeight, setNumHeight] = useState(32);

  const textareaRef = useRef(null);

  const [page, setPage] = useState<number>(1);

    const [openEmo, setOpenEmo] = useState<boolean>(false);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const textarea = textareaRef.current;
    if (textarea) {
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 32), 128); // 32px = 2rem, 128px = 8rem
      setNumHeight(newHeight);
      setHeight(`${newHeight}px`);
      setContent(e.target.value);
    }
    if (e.target.value === "") {
      setHeight(`${32}px`);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = height;
    }
  }, [height]);

  const handleFirstMessage = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (!content) {
      return;
    }
    try {
      if (room || listMessage.length > 0) {
        socket.emit("send-message", room?._id, content);
      } else {
        socket.emit("send-first-message", roomId, content);
      }
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
    const handleNewMessage = (newMessage: MessageProp, roomIdRe: string) => {
      if (room?._id === roomIdRe) {
        setListMessage((prevMessage) => [newMessage, ...prevMessage]);
      }
    };
    socket.on("send-message", handleNewMessage);

    return () => {
      socket.off("send-message");
    };
  }, [setListMessage, room?._id]);
  useEffect(() => {
    const handleNewRoom = (
      newRoom: Room,
      newMessage: MessageProp,
      userId: string
    ) => {
      console.log("aaaa");
      if (roomId === userId) {
        setRoom(newRoom);
        setListMessage((prevMessage) => [newMessage, ...prevMessage]);
      }
    };
    socket.on("new-room", handleNewRoom);

    return () => {
      socket.off("new-room");
    };
  }, [setRoom]);
  useEffect(() => {
    socket.off("error-message").on("error-message", (error) => {
      toastifyUtils("error", "Lỗi server");
    });

    return () => {
      socket.off("error-message");
    };
  }, []);

  const handleLoadMoreMess = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await getMessageForRoom(
        room?._id,
        listMessage.length > 0 ? listMessage.length : 0
      );
      if (res.code === 4) {
        setIsLoading(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 15) {
        setIsLoading(false);
        setEnd(false);
      }
      if (res.code === 0) {
        setIsLoading(false);
        setListMessage((prevMessage) => [...prevMessage, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  useEffect(() => {
    const handleDelete = (roomId: string, messageId: string) => {
      setListMessage((prevMessage) =>
        prevMessage.filter((item) => item._id !== messageId)
      );
    };
    socket.on("delete-message", handleDelete);

    return () => {
      socket.off("delete-message");
    };
  }, [setListMessage, room?._id]);
  useEffect(() => {
    socket.off("error-delete-message").on("error-delete-message", (error) => {
      toastifyUtils("error", error.msg);
      setPending(false);
    });

    return () => {
      socket.off("error-delete-message");
    };
  }, []);

  useEffect(() => {
    const handleRead = (message: MessageProp) => {
     setListMessage((prevMessages) =>
       prevMessages.map((item) =>
         item._id === message._id
           ? { ...item, isRead: [...message.isRead] }
           : item
       )
     );
    };
    socket.on("read-message", handleRead);

    return () => {
      socket.off("read-message");
    };
  }, [setListMessage, room?._id]);

  return (
    <>
      {" "}
      {user ? (
        <BoxChatHeader roomId={roomId} index={index} user={user} />
      ) : (
        <div className="h-[3rem] w-full rounded-t-[8px] flex justify-between px-2 py-1 items-center">
          {" "}
          <Skeleton className="border-2 w-[2rem] h-[2rem] rounded-full" />
          <Skeleton className="w-[18rem] rounded-[8px] h-[2rem]" />
        </div>
      )}
      <div className="border-slate-300 w-full h-[1px] border-t-[1px]"></div>
      <ChatContainer
        room={room}
        listMessage={listMessage}
        setListMessage={setListMessage}
        handleLoadMoreMess={handleLoadMoreMess}
        end={end}
        setEnd={setEnd}
        pending={pending}
        setPending={setPending}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className="border-slate-300 w-full h-[1px] border-t-[1px] mb-1 "></div>
      <div className="w-full  px-1 flex gap-2 items-end z-[51]">
        <textarea
          className="outline-none	bg-white/0 p-1 text-[1rem] w-[92%]  min-h-[2rem] max-h-[8rem] resize-none shadow-beautiful bg-gray-200 rounded-[12px]"
          placeholder="Aa"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFirstMessage(e);
              e.currentTarget.value = "";
            }
          }}
          onChange={handleInput}
          value={content}
          ref={textareaRef}
          style={{ overflowY: "auto" }}
        />
        <Popover open={openEmo} onOpenChange={setOpenEmo}>
          <PopoverTrigger>
            <div>
              <MdOutlineEmojiEmotions
                size={24}
                color={openEmo ? "blue" : "gray"}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="z-[50000] w-auto h-auto">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </PopoverContent>
        </Popover>
        <button
          type="submit"
          className="flex justify-end items-center w-[8%] mb-1 	"
          disabled={content ? false : true}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleFirstMessage(e);
          }}
        >
          <PiPaperPlaneRightFill
            color={content ? "#1E90FF" : "gray"}
            className="mr-2"
            size={20}
          />
        </button>
      </div>
    </>
  );
};

export default BoxChatCard;
