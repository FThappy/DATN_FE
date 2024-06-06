import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LuHeading2 } from "react-icons/lu";
import { Editor } from "@tiptap/react";
import { IoMdArrowDropdown } from "react-icons/io";

type Props = {
  editor: Editor | null;
  content: string;
};

const HeadingToolbar = ({ editor, content }: Props) => {
  const [openPopover, setOpenPopover] = useState(false);

  if (!editor) {
    return null;
  }
  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <div className="w-[10rem] px-1 border-x-2 border-slate-400 flex items-center justify-center gap-2">
          {editor.isActive("heading", { level: 1 }) && "Tiêu đề 1"}
          {editor.isActive("heading", { level: 2 }) && "Tiêu đề 2"}
          {editor.isActive("heading", { level: 3 }) && "Tiêu đề 3"}
          {editor.isActive("paragraph") && "Văn bản thường"}
          <IoMdArrowDropdown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 items-start p-1 outline-none w-[12rem]">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`
            
              w-full border-b-[1px] border-slate-400 px-4 outline-none flex justify-start py-2
              `}
        >
          <p
            className={`${
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-400 p-1 "
                : "text-black p-1"
            } text-[2.125rem] leading-[1.5rem] font-bold `}
          >
            Tiêu đề 1
          </p>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`
          
              w-full border-b-[1px] border-slate-400 px-4 outline-none flex justify-start py-2
              `}
        >
          <p
            className={`${
              editor.isActive("heading", { level: 2 })
                ? "bg-gray-400 p-1 "
                : "text-black p-1"
            } text-[1.875rem] leading-[1.25rem] font-bold`}
          >
            Tiêu đề 2
          </p>{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={`
              w-full border-b-[1px] border-slate-400 px-4 outline-none flex justify-start py-2
              `}
        >
          <p
            className={`${
              editor.isActive("heading", { level: 3 })
                ? "bg-gray-400 p-1 "
                : "text-black p-1"
            } text-[1.5rem] leading-[1rem] font-bold`}
          >
            Tiêu đề 3
          </p>{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          className={`

              w-full border-b-[1px] border-slate-400 px-4 outline-none flex justify-start
              `}
        >
          <p
            className={`${
              editor.isActive("paragraph")
                ? "bg-gray-400 p-1 "
                : "text-black p-1"
            } `}
          >
            Văn bản thường
          </p>
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default HeadingToolbar;
