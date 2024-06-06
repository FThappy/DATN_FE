"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import DateInputProject from "./DateInputProject";
import TypeInputProject from "./TypeInputProject";
import { cityDummy } from "@/lib/placeholder-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { CiCircleRemove } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import toastifyUtils from "@/utils/toastify";
import { createProject } from "@/actions/createProject";
import { checkValidCard } from "@/utils/untilsCardNumber";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { ProjectProps } from "@/utils/typeProject";
import Tiptap from "../Tiptap";
import { isEqual } from "date-fns";
import { updateProject } from "@/actions/updateProject";
import { JSONContent } from "@tiptap/react";
import TiptapUpdate from "./TiptapUpdate";

type Props = {
  project: ProjectProps;
};

const UpdateProject = (props: Props) => {
  const { project } = props;
  const user = userStore((state: any) => state?.user);

  const [projectName, setProjectName] = useState<string>(project.projectName);

  const [description, setDescription] = useState<string>(project.description);

  const [goal, setGoal] = useState<number>(project.goal);

  const [city, setCity] = useState<string>(project.city);

  const [cardNumber, setCardNumber] = useState<string>(project.cardNumber);

  const router = useRouter();

  const [date, setDate] = useState<Date>(new Date(project.timeEnd));

  const [type, setType] = useState<string[]>(project.type);

  const [content, setContent] = useState<string>();

  const [pending, setPending] = useState(false);

  const [files, setFiles] = useState<(File | string)[]>(project.image);

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const [fileRemove, setFileRemove] = useState<string[]>([]);

  const [contentJSON, setContentJSON] = useState<JSONContent>(project.content);

  const [tmpImg, setTmpImg] = useState<any>(
    project?.content?.content?.filter((url) => url.type === "image")
  );

  const [imageContent, setImageContent] = useState<File[]>([]);

  const [imageContentRemoved, setImageContentRemoved] = useState<string[]>([]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    const fileArray = Array.from(fileList!);
    setFiles((prevFiles) => [...(prevFiles || []), ...fileArray]);
    setNewFiles((prevFiles) => [...(prevFiles || []), ...fileArray]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    if (typeof files[index] === "string") {
      setFileRemove((prev) => [...prev, files[index] as string]);
    } else {
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
  const removeAll = () => {
    setNewFiles([]);
    setFiles([]);
    setFileRemove((prev) => [...prev, ...project.image]);
  };
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!user) {
      return toastifyUtils(
        "info",
        "Vui lòng đăng nhập để thực hiện chức năng này"
      );
    }
    setPending(true);
    try {
      if (
        projectName === project.projectName &&
        description === project.description &&
        isEqual(date, new Date(project.timeEnd)) &&
        city === project.city &&
        JSON.stringify(type) === JSON.stringify(project.type) &&
        content === project.content &&
        newFiles.length <= 0 &&
        fileRemove.length <= 0
      ) {
        setPending(false);
        return toastifyUtils("warning", "Thông tin này không có gi thay đổi");
      }
      if (date <= new Date()) {
        setPending(false);
        return toastifyUtils("warning", "Ngày kết thúc không hợp lệ");
      }
      const formData = new FormData();
      if (projectName !== project.projectName) {
        formData.append("projectName", projectName);
      }
      if (description !== project.description) {
        formData.append("description", description);
      }
      if (JSON.stringify(type) !== JSON.stringify(project.type)) {
        formData.append("type", JSON.stringify(type));
      }
      if (!isEqual(date, new Date(project.timeEnd))) {
        formData.append("date", date.toString());
      }
      if (city !== project.city) {
        formData.append("city", city);
      }
      formData.append("content", JSON.stringify(contentJSON));
      if (goal !== project.goal) {
        formData.append("goal", goal.toString());
      }
      if (cardNumber !== project.cardNumber) {
        if (checkValidCard(cardNumber)) {
          formData.append("cardNumber", cardNumber);
        } else {
          return toastifyUtils("warning", "Định dạnh thẻ không hợp lệ");
        }
      }

      if (newFiles.length > 0) {
        files.forEach((file) => {
          formData.append("file", file); // Sử dụng cùng một tên "files[]" cho tất cả các file
        });
      }
      if (imageContent.length > 0) {
        imageContent.forEach((file) => {
          formData.append("fileContent", file);
        });
      }
      if (imageContentRemoved.length > 0) {
        formData.append(
          "imageContentRemove",
          JSON.stringify(imageContentRemoved)
        );
      }
      if (fileRemove.length > 0) {
        formData.append("imageRemove", JSON.stringify(fileRemove));
      }
      const res = await updateProject(formData, project._id);
      setPending(false);
      if (res.code === 1) {
        return toastifyUtils("warning", "Hiện chỉ hỗ trợ file ảnh");
      }
      if (res.code === 2) {
        return toastifyUtils("warning", "Không đầy đủ thông tin");
      }
      if (res.code === 3) {
        return toastifyUtils("warning", "Không tồn tại người dùng");
      }
      if (res.code === 4) {
        return toastifyUtils("error", "Lỗi server");
      }
      if (res.code === 5) {
        return toastifyUtils("error", "Định dạng thẻ không hợp lệ");
      }
      if (res.code === 9) {
        return toastifyUtils("error", "Dự án của bạn đã bị khóa");
      }
      toastifyUtils("success", "Cập nhật dự án thành công");
      setProjectName(res.project.projectName);
      setDescription(res.project.description);
      setGoal(res.project.goal);
      setCity(res.project.city);
      setCardNumber(res.project.cardNumber);
      setDate(new Date(res.project.timeEnd));
      setType(res.project.type);
      setContent(res.project.content);
      setFiles(res.project.image);
      setNewFiles([]);
      setFileRemove([]);
      setTmpImg(
        res.project?.content?.content?.filter((url) => url.type === "image")
      );
      setImageContent([]);
      setImageContentRemoved([]);
    } catch (error) {
      console.log(error);
      setPending(false);
      return toastifyUtils("error", "Lỗi server");
    }
  };
  useEffect(() => {
    tmpImg.map((item, index) => {
      if (
        !contentJSON?.content
          ?.filter((url) => url.type === "image")
          .find((url) => url.attrs.src === item.attrs.src)
      ) {
        if (item.attrs.src.startsWith("blob")) {
          const numberIndex = index - tmpImg.length + imageContent.length;
          setImageContent((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(numberIndex, 1);
            return newFiles;
          });
          tmpImg.splice(index, 1);
        } else {
          setImageContentRemoved((url) => [...url, item.attrs.src]);
          tmpImg.splice(index, 1);
        }
      }
    });
  }, [contentJSON, tmpImg]);
  console.log(tmpImg);
  console.log(imageContent);
  console.log(imageContentRemoved);

  return (
    <div className="flex flex-col gap-1 items-center bg-[#f1eff4d1]  ">
      <p className="text-[1.5rem] font-bold mb-4">Tạo dự án từ thiện cho bạn</p>
      {files.length > 0 ? (
        <Carousel>
          <CarouselContent className="w-[55rem] h-[25rem] ml-0 pl-0">
            {files.map((file, index) => (
              <CarouselItem key={index} className="ml-0 pl-0 relative">
                <img
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt="image"
                  className="w-full h-full  cursor-pointer "
                />
                <button
                  className="absolute top-2 right-2  cursor-pointer  flex items-center justify-center w-[30px] h-[30px]  rounded-full"
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
              </CarouselItem>
            ))}
          </CarouselContent>
          {files.length > 1 ? (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </>
          ) : (
            <></>
          )}
          <div className="absolute bottom-4 right-4 flex items-center justify-center gap-2">
            {" "}
            <label htmlFor="file">
              <div className=" flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2">
                <LuImagePlus color="white" size={24} />
                <p className="font-bold text-white">Thêm ảnh</p>
              </div>
            </label>
            <input
              id="file"
              name="file"
              type="file"
              className="hidden"
              multiple
              onChange={handleChangeFile}
            />
            <button
              className=" flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2"
              onClick={removeAll}
            >
              <MdDeleteOutline color="white" size={24} />
              <p className="font-bold text-white">Gỡ tất cả</p>
            </button>
          </div>
        </Carousel>
      ) : (
        <div className="bg-black/60 w-[55rem] h-[25rem] relative">
          <label htmlFor="file">
            <div className="absolute bottom-4 right-4 flex items-center justify-center bg-black/60 hover:bg-black/75 w-[120px] h-[45px] gap-1 rounded-[8px] cursor-pointer p-2">
              <LuImagePlus color="white" size={24} />
              <p className="font-bold text-white">Thêm ảnh</p>
            </div>
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className="hidden"
            multiple
            onChange={handleChangeFile}
          />
        </div>
      )}
      <form className="flex flex-col gap-1 items-center">
        <div className="flex flex-col gap-1">
          <label htmlFor="nameProject" className="font-medium">
            Tên dự án của bạn <span className="text-red">*</span> :
          </label>
          <input
            name="nameProject"
            id="nameProject"
            type="text"
            className="p-2 w-[55rem] h-[2rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
            placeholder="Nhập tên dự án của bạn...."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setProjectName(e.target.value);
            }}
            value={projectName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Miêu tả<span className="text-red">*</span> :
          </label>
          <textarea
            name="description"
            id="description"
            className="p-2 w-[55rem] h-[5rem] min-h-[5rem] max-h-[5rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
            placeholder="Miêu tả nội dung..."
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="font-medium">
              Địa điểm hoạt động chính<span className="text-red">*</span> :
            </label>
            <select
              id="city"
              name="city"
              className="p-2 w-[27rem] h-[2.5rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                e.preventDefault();
                setCity(e.target.value);
              }}
              defaultValue={city}
            >
              <option value="" disabled hidden>
                Địa điểm hoạt động chính :
              </option>
              {cityDummy.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="font-medium">
              Thời gian kết thúc<span className="text-red">*</span> :
            </label>
            <DateInputProject date={date} setDate={setDate} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="typeProject" className="font-medium">
            Loại dự án<span className="text-red">*</span> :
          </label>
          <TypeInputProject type={type} setType={setType} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="goal" className="font-medium">
              Số tiền muốn nhận được(VND):
            </label>
            <input
              name="goal"
              id="goal"
              type="number"
              className="p-2 w-[27rem] h-[2rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
              placeholder="Số tiền muốn nhận được...."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setGoal(e.target.valueAsNumber);
              }}
              value={goal}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="goal" className="font-medium">
              Số thẻ nhận tiền:
            </label>
            <input
              name="goal"
              id="goal"
              type="string"
              className="p-2 w-[27rem] h-[2rem] outline-none 
          px-3 border border-gray-400 rounded-[8px]"
              placeholder="Nhập đủ 16 số...."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setCardNumber(e.target.value);
              }}
              value={cardNumber}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium">
            Nội dung<span className="text-red">*</span> :
          </label>
          <TiptapUpdate
            content={content}
            contentJSON={contentJSON}
            setContentJSON={setContentJSON}
            imageContent={imageContent}
            setImageContent={setImageContent}
            onChange={(newContent: string) => handleContentChange(newContent)}
            tmpImg={tmpImg}
            setTmpImg={setTmpImg}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor:
              !user ||
              (projectName === project.projectName &&
                description === project.description &&
                isEqual(date, new Date(project.timeEnd)) &&
                city === project.city &&
                JSON.stringify(type) === JSON.stringify(project.type) &&
                content === project.content &&
                newFiles.length <= 0 &&
                fileRemove.length <= 0)
                ? "#F84D42"
                : "#20b86d",
          }}
          className={`h-[40px] w-[98%] mr-4 mb-2 mt-2 bg-green rounded flex justify-center 
          shadow-beautiful items-center font-bold text-white text-[1.2rem] cursor-pointer
      `}
          onClick={handleSubmit}
          disabled={
            !user ||
            (projectName === project.projectName &&
              description === project.description &&
              isEqual(date, new Date(project.timeEnd)) &&
              city === project.city &&
              JSON.stringify(type) === JSON.stringify(project.type) &&
              content === project.content &&
              newFiles.length <= 0 &&
              fileRemove.length <= 0)
          }
        >
          {pending ? (
            <>
              <p>Loading</p>
              <div className="loader"></div>
            </>
          ) : (
            "Xác nhận"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
