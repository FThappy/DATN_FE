import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LuHeading2, LuImagePlus } from "react-icons/lu";
import { Editor } from "@tiptap/react";
import { IoMdArrowDropdown } from "react-icons/io";

type Props = {
  editor: Editor | null;
  content: string;
  imageContent: File[];
  setImageContent: React.Dispatch<React.SetStateAction<File[]>>;
  tmpImg: any[];
  setTmpImg: React.Dispatch<React.SetStateAction<any[]>>;
};

const ImageToolbar = ({
  editor,
  content,
  imageContent,
  setImageContent,
  tmpImg,
  setTmpImg,
}: Props) => {
  const [openPopover, setOpenPopover] = useState(false);

  if (!editor) {
    return null;
  }
  return (
    <div>
      <label htmlFor="fileContent">
        <div className=" flex items-center justify-center bg-black/40 hover:bg-black/75 w-[120px] h-[40px] gap-1 rounded-[8px] cursor-pointer p-2">
          <LuImagePlus color="white" size={24} />
          <p className="font-bold text-white">Thêm ảnh</p>
        </div>
      </label>
      <input
        id="fileContent"
        name="fileContent"
        type="file"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          const urlLink = URL.createObjectURL(e.target.files![0])
          editor
            .chain()
            .focus()
            .insertContent([
              {
                type: "image",
                attrs: {
                  src: urlLink,
                },
              },
            ])
            .run();
          const imgContent = e.target.files[0];
          setTmpImg((prev) => [
            ...prev,
            {
              type: "image",
              attrs: {
                src: `${urlLink}`,
              },
            },
          ]);
          setImageContent((prevFiles) => [...prevFiles, imgContent]);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageToolbar;
