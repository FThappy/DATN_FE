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
import { FaRegFileImage } from "react-icons/fa6";
import { createFirstMess } from "@/actions/createFirstMess";
import { createMessage } from "@/actions/createMessage";
import { CiCircleRemove } from "react-icons/ci";
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

  const [content, setContent] = useState<string>("");

  const [pending, setPending] = useState<boolean>(false);

  const [height, setHeight] = useState("2rem");

  const [numHeight, setNumHeight] = useState(32);

  const textareaRef = useRef(null);

  const [page, setPage] = useState<number>(1);

  const [openEmo, setOpenEmo] = useState<boolean>(false);

  const [fileImage, setFileImage] = useState<File[]>([]);

  const removeFile = (index: number) => {
    setFileImage((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

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

  // const handleFirstMessage = async (
  //   event:
  //     | React.MouseEvent<HTMLButtonElement>
  //     | KeyboardEvent<HTMLTextAreaElement>
  // ) => {
  //   event.preventDefault();
  //   if (!content) {
  //     return;
  //   }
  //   try {
  //     if (room || listMessage.length > 0) {
  //       handleMessageFirst(event);
  //     } else {
  //       handleMessageFirst(event);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toastifyUtils("error", "Lỗi server");
  //   }
  // };

  const handleMessage = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (!content && fileImage.length <= 0) {
      return toastifyUtils("error", "Không được để trống");
    }
    if (fileImage && fileImage.length > 0) {
      const nonImageFile = fileImage.find(
        (file) => !file.type.startsWith("image/")
      );
      if (nonImageFile) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
    }
    const formData = new FormData();
    formData.append("roomId", room?._id!);
    formData.append("content", content);
    if (fileImage.length > 0) {
      fileImage.forEach((file) => {
        formData.append("file", file); // Sử dụng cùng một tên "files[]" cho tất cả các file
      });
    }
    setContent("");
    setFileImage([]);
    try {
      const res = await createMessage(formData);

      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 8) {
        return toastifyUtils("warning", "Không được để trống thông tin");
      }
      if (res.code === 9) {
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  const handleMessageFirst = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    if (!content && fileImage.length <= 0) {
      return toastifyUtils("error", "Không được để trống");
    }
    if (fileImage && fileImage.length > 0) {
      const nonImageFile = fileImage.find(
        (file) => !file.type.startsWith("image/")
      );
      if (nonImageFile) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
    }
    const formData = new FormData();
    formData.append("roomId", roomId);
    formData.append("content", content);
    if (fileImage.length > 0) {
      fileImage.forEach((file) => {
        formData.append("file", file); // Sử dụng cùng một tên "files[]" cho tất cả các file
      });
    }
    setContent("");
    setFileImage([]);
    try {
      const res = await createFirstMess(formData);

      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 8) {
        return toastifyUtils("warning", "Không được để trống thông tin");
      }
      if (res.code === 9) {
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
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
      {fileImage && fileImage.length > 0 && (
        <div className="h-[5rem] p-2 w-full flex flex-wrap gap-1 bg-white relative border-t-1 border-gray-300 max-w-[100%] overflow-y-auto">
          {fileImage.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="image"
                className="w-[5rem] h-[5rem] cursor-pointer"
              />
              <button
                className="absolute top-2 right-2 cursor-pointer flex items-center justify-center w-[30px] h-[30px] rounded-full"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  removeFile(index);
                }}
              >
                <CiCircleRemove
                  color="white"
                  size={32}
                  className="bg-black/40 rounded-full w-[30px] h-[30px]"
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="border-slate-300 w-full h-[1px] border-t-[1px] mb-1 "></div>
      <div className="w-full  px-1 flex gap-2 items-end z-[51]">
        <textarea
          className="outline-none	bg-white/0 p-1 text-[1rem] w-[92%]  min-h-[2rem] max-h-[8rem] resize-none shadow-beautiful bg-gray-200 rounded-[12px]"
          placeholder="Aa"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (room || listMessage.length > 0) {
                handleMessage(e);
              } else {
                handleMessageFirst(e);
              }
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
        <label
          htmlFor={`fileImage-${roomId}`}
          className="rounded-full bottom-5 right-4 hover:bg-gray-100 cursor-pointer"
        >
          <FaRegFileImage size={24} />
        </label>
        <input
          id={`fileImage-${roomId}`}
          name="fileImage"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => {
            e.preventDefault();
            const fileList = e.target.files;
            const fileArray = Array.from(fileList!);
            setFileImage((prevFiles) => [...(prevFiles || []), ...fileArray]);
            e.target.value = "";
          }}
        />
        <button
          type="submit"
          className="flex justify-end items-center w-[8%] mb-1 	"
          disabled={content || fileImage.length > 0 ? false : true}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (room || listMessage.length > 0) {
              handleMessage(e);
            } else {
              handleMessageFirst(e);
            }
          }}
        >
          <PiPaperPlaneRightFill
            color={content || fileImage.length > 0 ? "#1E90FF" : "gray"}
            className="mr-2"
            size={20}
          />
        </button>
      </div>
    </>
  );
};

export default BoxChatCard;
