import { getMessageForRoom } from "@/actions/getMessageForRoom";
import ChatContainer from "@/components/ChatContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { socket } from "@/utils/requestMethod";
import toastifyUtils from "@/utils/toastify";
import { UserPublic } from "@/utils/typeAuth";
import { CardRoom, MessageProp, Room } from "@/utils/typeMess";
import React, {
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
  ChangeEvent,
} from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";

type Props = {
  active: CardRoom;
};

const MainMess = (props: Props) => {
  const { active } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [room, setRoom] = useState<Room>();

  const [listMessage, setListMessage] = useState<MessageProp[]>([]);

  const [end, setEnd] = useState<boolean>(true);

  const [user, setUser] = useState<UserPublic>();

  const [content, setContent] = useState<string>();

  const [pending, setPending] = useState<boolean>(false);

  const [height, setHeight] = useState("4rem");

  const [numHeight, setNumHeight] = useState(32);

  const textareaRef = useRef(null);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getMess = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await getMessageForRoom(active.room._id, 0);
        if (res.code === 0) {
          setIsLoading(false);
          socket.emit("join-messageRoom", active.room._id);
          setListMessage(res.data);
          setUser(active?.user);
        } else {
          setIsLoading(false);
          setListMessage([]);
          setRoom(undefined);
          setEnd(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    if (active.room.type === "single") {
      getMess();
    }
  }, [active]);

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
      socket.emit("send-message", active.room._id, content);
      setContent("");
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };
  useEffect(() => {
    const handleNewMessage = (newMessage: MessageProp, roomIdRe: string) => {
      if (active.room._id === roomIdRe) {
        setListMessage((prevMessage) => [newMessage, ...prevMessage]);
      }
    };
    socket.on("send-message", handleNewMessage);

    return () => {
      socket.off("send-message");
    };
  }, [setListMessage, active.room._id]);

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
        active.room._id,
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
  }, [setListMessage, active.room._id]);
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
  }, [setListMessage, active.room._id]);
  return (
    <div className="w-[56%] bg-white laptop:h-[39.5rem] desktop:h[53rem] flex flex-col">
      <div className="h-[4rem] w-full rounded-t-[8px] flex justify-between px-2 py-1 items-center border-b-2 border-b-gray-300">
        {user ? (
          <div className="flex gap-2 items-center">
            <img
              src={user?.img ? user.img : "/twitter.png"}
              alt="image"
              className="border-2 w-[3rem] h-[3rem] rounded-full"
              loading="lazy"
            />
            <p className="font-medium text-[1.2rem] self-start">
              {user?.displayname ? user.displayname : user?.username}
            </p>
          </div>
        ) : (
          <>
            <Skeleton className="border-2 w-[2rem] h-[2rem] rounded-full" />
            <Skeleton className="w-[18rem] rounded-[8px] h-[2rem]" />
          </>
        )}
      </div>
      <ChatContainer
        room={active.room}
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
    </div>
  );
};

export default MainMess;
