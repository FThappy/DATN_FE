"use client";
import React, { ChangeEvent, useState } from "react";
import { userStore } from "@/store/userStore";
import Image from "next/image";
import ImageGroupPreview from "./utils/ImageGroupPreview";
import { AiOutlineClose } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import ChangeImagePost from "./ChangeImagePost";
import toastifyUtils from "@/utils/toastify";
import { createPost } from "@/actions/createPost";
import { PostProps } from "@/utils/typePost";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MdOutlineEmojiEmotions } from "react-icons/md";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  posts: PostProps[];
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  organizationId: string | undefined;
  type: string | undefined;
};

const ModalCreatePost = (props: Props) => {
  const user = userStore((state: any) => state?.user);

  const { posts, setPosts, organizationId, type } = props; // State để lưu trữ danh sách bài đăng

  const [files, setFiles] = useState<File[]>([]);

  const [documention, setDocumention] = useState<string>();

  const [privacy, setPrivacy] = useState<string>("global");

  const [active, setActive] = useState<boolean>(false);

  const [pending, setPending] = useState(false);

  const [openEmo, setOpenEmo] = useState<boolean>(false);

  const removeFile = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    const fileArray = Array.from(fileList!);
    setFiles((prevFiles) => [...(prevFiles || []), ...fileArray]);
    e.target.value = "";
  };
  const handleEmojiSelect = (emoji: any) => {
    setDocumention((prev) => (prev ? prev + emoji.native : emoji.native)); // Thêm emoji vào nội dung hiện tại của textarea
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (files.length <= 0 && !documention) {
      return toastifyUtils("warning", "Vui lòng nhập đầy đủ thông tin");
    }

    const formData = new FormData();
    formData.append("privacy", privacy);
    if (documention) {
      formData.append("documention", documention);
    }
    if (organizationId) {
      formData.append("organizationId", organizationId);
    }
    if (type) {
      formData.append("type", type);
    }
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("file", file); // Sử dụng cùng một tên "files[]" cho tất cả các file
      });
    }
    setPending(true);
    try {
      const res = await createPost(formData);
      setPending(false);
      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
      toastifyUtils("success", "Đăng bài viết thành công");
      setPosts((prevPost) => [res.post, ...prevPost]);
      props.setOpen(false);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };
  return (
    <>
      {!active ? (
        <div className="absolute flex flex-col items-center w-full h-auto min-h-[120%] bg-black/75 z-[120] top-0 left-0 py-4 ">
          <div className=" w-[50rem] h-auto shadow-beautifulunded-[0.5rem]	bg-white mb-10 rounded-[8px]">
            <div className="p-2 pt-4 flex items-center w-full justify-center relative">
              <p className="text-[1.5rem] font-bold">Tạo bài viết</p>
              <button
                className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[50px] 
          h-[50px] absolute right-2 cursor-pointer"
                onClick={() => props.setOpen(false)}
              >
                <div className="flex items-center justify-center w-[30px] h-[30px]">
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
            </div>
            <div className="border-slate-300 w-full h-[10px] border-t-[1px] mt-[0.65rem]"></div>
            <div className="flex flex-col items-center">
              <div className="w-full h-[60px] cursor-pointer flex items-center gap-2 p-2  mb-2">
                <div className="w-[50px] h-[50px]">
                  <Image
                    src={user?.img ? user?.img : "/twitter.png"}
                    alt="logo-user"
                    loading="lazy"
                    height={50}
                    width={50}
                    className="cursor-pointer rounded-full  h-full"
                  />
                </div>
                <div className="flex flex-col  justify-center">
                  <p className="font-bold text-[1.3rem] text-slate-800 mr-[1rem]">
                    {user?.displayName ? user?.displayName : user?.username}
                  </p>
                  <select
                    className="flex items-center justify-center bg-[#E8E5ED] rounded-[8px] w-[75%] text-[0.8rem] font-bold p-2 "
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      e.preventDefault();
                      setPrivacy(e.target.value);
                    }}
                  >
                    <option value="global">Công khai</option>
                    <option value="private">Riêng tư</option>
                  </select>
                </div>
                {files.length > 0 && (
                  <div className="flex gap-2 ml-[15rem]">
                    <button
                      className="flex items-center justify-center bg-gray-100
                     hover:bg-gray-300 w-[120px] h-[50px] gap-1 rounded-[12px] cursor-pointer p-2"
                      onClick={() => setActive(true)}
                    >
                      <RiPencilFill size={24} />{" "}
                      <p className="font-bold">Chỉnh sửa</p>
                    </button>
                    <label htmlFor="file">
                      <div className="flex items-center justify-center bg-gray-100 hover:bg-gray-300 w-[180px] h-[50px] gap-1 rounded-[12px] cursor-pointer p-2">
                        <Image
                          src="/upload-image.png"
                          alt="logo-user"
                          loading="lazy"
                          height={10}
                          width={30}
                          className="h-full"
                        />
                        <p className="font-bold">Thêm ảnh/video</p>
                      </div>
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        handleChangeFile(e);
                      }}
                    />
                  </div>
                )}
              </div>
              <textarea
                placeholder="Bạn đang nghĩ gi thế?"
                className=" focus:outline-none py-4 px-2 self-start w-[98%] h-auto max-h-[30rem]"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setDocumention(e.target.value);
                }}
                value={documention}
              />
              <Popover open={openEmo} onOpenChange={setOpenEmo} >
                <PopoverTrigger className="w-full flex justify-end ">
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

              {!(files.length > 0) ? (
                <div className="w-[95%] border-slate-300 h-[25rem] mb-[1rem] border-[1px] mt-[0.65rem] rounded-[10px] p-2">
                  <label htmlFor="file">
                    <div
                      className="h-full w-full bg-gray-100 rounded-[12px] flex flex-col items-center justify-center hover:bg-gray-300
              cursor-pointer"
                    >
                      <div
                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-full w-[50px] 
          h-[50px]  cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-[30px] h-[30px]">
                          <Image
                            src="/upload-image.png"
                            alt="logo-user"
                            loading="lazy"
                            height={10}
                            width={30}
                            className="  h-full"
                          />
                        </div>
                      </div>
                      <p className="text-[1.2rem] font-bold">Thêm ảnh/video</p>
                    </div>
                  </label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      handleChangeFile(e);
                    }}
                  />
                </div>
              ) : (
                <div className="w-[95%] border-slate-300  mb-[1rem] border-[1px] mt-[0.65rem] rounded-[10px] relative">
                  <button
                    className="absolute z-50 right-3 top-4 flex items-center justify-center bg-gray-100 rounded-full p-2  cursor-pointer hover:bg-gray-300"
                    onClick={() => setFiles([])}
                  >
                    <AiOutlineClose size={16} />
                  </button>
                  <ImageGroupPreview listUrl={files} />
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      handleChangeFile(e);
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="h-[40px] w-[95%] mb-4 bg-green rounded flex justify-center items-center font-bold text-white text-[1.2rem]"
                disabled={(files.length <= 0 && !documention) || pending}
                style={{
                  backgroundColor:
                    files.length <= 0 && !documention ? "#F84D42" : "#20b86d",
                }}
                onClick={handleSubmit}
              >
                {pending ? (
                  <>
                    <p>Loading</p>
                    <div className="loader"></div>
                  </>
                ) : (
                  "Đăng bài"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ChangeImagePost
          active={active}
          setActive={setActive}
          files={files}
          setFiles={setFiles}
          removeFile={removeFile}
          handleChangeFile={handleChangeFile}
        />
      )}
    </>
  );
};

export default ModalCreatePost;
