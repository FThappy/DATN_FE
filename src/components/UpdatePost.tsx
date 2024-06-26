import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { BiSolidPencil } from "react-icons/bi";
import Image from "next/image";
import { RiPencilFill } from "react-icons/ri";
import { PostProps } from "@/utils/typePost";
import { User } from "@/utils/typeAuth";
import { AiOutlineClose } from "react-icons/ai";
import ImageGroupPreview from "./utils/ImageGroupPreview";
import ChangeImagePost from "./ChangeImagePost";
import toastifyUtils from "@/utils/toastify";
import { updatePost } from "@/actions/updatePost";

type Props = {
  post: PostProps;
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
  user: User;
  index: number;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdatePost = (props: Props) => {
  const { post, user, index, setPosts, setOpenPopover } = props;

  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<(File | string)[]>(post.img);

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const [documention, setDocumention] = useState<string>(post.document);

  const [privacy, setPrivacy] = useState<string>(post.privacy);

  const [active, setActive] = useState<boolean>(false);

  const [pending, setPending] = useState(false);

  const [removeFiles, setRemoveFiles] = useState<string[]>([]);

  const removeFile = (index: number) => {
    if (typeof files[index] === "string") {
      setRemoveFiles((prev: string[]): string[] => [
        ...prev,
        files[index] as string,
      ]);
    }
    if (files[index] instanceof File) {
      setNewFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(index - files.length, 1);
        return newFiles;
      });
    }
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
    setNewFiles((prevFiles) => [...(prevFiles || []), ...fileArray]);
    e.target.value = "";
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (post.document !== documention) {
      formData.append("documention", documention);
    }
    if (post.privacy !== privacy) {
      formData.append("privacy", privacy);
    }
    if (removeFiles.length > 0) {
      formData.append("imageRemove", JSON.stringify(removeFiles));
    }
    if (newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("file", file); // Sử dụng cùng một tên "files[]" cho tất cả các file
      });
    }
    setPending(true);
    try {
      const res = await updatePost(formData, post._id, user._id);
      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "Không tồn tại post");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        newPosts.splice(index, 1, res.post);
        return newPosts;
      });
      setPending(false);
      toastifyUtils("success", "Sửa bài viết thành công");
      setOpenPopover(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <button className="w-full h-[50px] cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-1  rounded-[0.5rem] mt-1 ">
            <BiSolidPencil size={24} />
            <p className="font-bold text-[1.1rem]">Chỉnh sửa bài viết</p>
          </button>
        </DialogTrigger>

        {!active ? (
          <DialogContent
            className="w-[50rem] h-auto  shadow-beautiful rounded-[0.5rem]	bg-white p-0 m-0"
            // onInteractOutside={(e) => e.preventDefault()}
          >
            <div className="p-2 pt-4 flex items-center w-full justify-center relative">
              <p className="text-[1.5rem] font-bold">Chỉnh sửa bài viết</p>
              <button
                className="flex items-center justify-center bg-[#E8E5ED] rounded-full w-[50px] 
          h-[50px] absolute right-2 cursor-pointer"
                onClick={() => setOpenPopover(false)}
              >
                <DialogClose asChild>
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
                </DialogClose>
              </button>
            </div>
            <div className="border-slate-300 w-full h-[10px] border-t-[1px]"></div>
            <div className="flex flex-col items-center ">
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
                <div className="flex flex-col  justify-center ">
                  <p className="font-bold text-[1.3rem] text-slate-800 mr-[1rem]">
                    {user?.displayname ? user?.displayname : user?.username}
                  </p>
                  <select
                    className="flex items-center justify-center bg-[#E8E5ED] rounded-[8px] w-[70%] text-[0.8rem] font-bold p-2 z-[10000]"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setPrivacy(e.target.value);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      {post.privacy === "global" ? "Công khai" : "Riêng tư"}
                    </option>
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
                        handleChangeFile(e);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="w-full max-h-[30rem] overflow-y-scroll pl-1">
                <textarea
                  placeholder="Bạn đang nghĩ gi thế?"
                  className=" focus:outline-none py-4 px-2 self-start w-[98%] h-auto max-h-[30rem]"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    e.preventDefault();
                    setDocumention(e.target.value);
                  }}
                  value={documention}
                />
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
                        <p className="text-[1.2rem] font-bold">
                          Thêm ảnh/video
                        </p>
                      </div>
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeFile(e);
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-[100%] border-slate-300  mb-[1rem] border-[1px] mt-[0.65rem] rounded-[10px] relative">
                    <button
                      className="absolute z-50 right-3 top-4 flex items-center justify-center bg-gray-100 rounded-full p-2  cursor-pointer hover:bg-gray-300"
                      onClick={() => {
                        setFiles([]);
                        setRemoveFiles(post.img);
                        setNewFiles([]);
                      }}
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
                        handleChangeFile(e);
                      }}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="h-[40px] w-[95%] mb-2 mt-2 bg-green rounded flex justify-center items-center font-bold text-white text-[1.2rem] cursor-pointer"
                disabled={
                  (JSON.stringify(post.img) === JSON.stringify(files) &&
                    documention === post.document &&
                    privacy === post.privacy) ||
                  pending
                }
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
                  "Lưu bài"
                )}
              </button>
            </div>
          </DialogContent>
        ) : (
          <DialogContent
            className="w-full h-full shadow-beautiful rounded-[0.5rem]	bg-white/0 p-0 m-0 "
            // onInteractOutside={(e) => e.preventDefault()}
          >
            <ChangeImagePost
              active={active}
              setActive={setActive}
              files={files}
              setFiles={setFiles}
              removeFile={removeFile}
              handleChangeFile={handleChangeFile}
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default UpdatePost;
