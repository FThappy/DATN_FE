import { Editor } from '@tiptap/react';
import React from 'react'
import {
  LuBold,
  LuStrikethrough,
  LuItalic,
  LuList,
  LuListOrdered,
  LuHeading2,
  LuUnderline,
  LuQuote,
  LuUndo,
  LuRedo,
  LuCode,
} from "react-icons/lu";
import HeadingToolbar from './HeadingToolbar';
import { BsTextIndentLeft } from "react-icons/bs";
import { BsTextIndentRight } from "react-icons/bs";
import JustifyToolbar from './JustifyToolbar';
import ImageToolbar from './ImageToolBar';
import LinkToolbar from './LinkToolbar';

type Props = {
  editor: Editor | null;
  content: string;
  imageContent: File[];
  setImageContent: React.Dispatch<React.SetStateAction<File[]>>;
  tmpImg: any[];
  setTmpImg: React.Dispatch<React.SetStateAction<any[]>>;
};

const Toolbar = ({ editor, content , imageContent , setImageContent , tmpImg , setTmpImg }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700 bg-gray-200 h-[3.5rem]"
    >
      <div className="flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap ">
        <HeadingToolbar editor={editor} content={content} />
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-gray-400 p-2 rounded-[8px]"
              : "text-black p-2"
          }
        >
          <LuBold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-gray-400 p-2 rounded-[8px]"
              : "text-black p-2"
          }
        >
          <LuItalic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-gray-400 p-2 rounded-[8px]"
              : "text-black p-2"
          }
        >
          <LuUnderline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-gray-400 p-2 rounded-[8px]"
              : "text-black p-2"
          }
        >
          <LuStrikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-gray-400 p-2 rounded-[8px]"
              : "text-black p-2"
          }
        >
          <LuList className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-gray-400 p-2 rounded-[8px]"
              : "text-black p-2"
          }
        >
          <LuListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setBlockquote().run();
          }}
          disabled={!editor.can().setBlockquote()}
          className="text-black p-2"
        >
          <BsTextIndentLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetBlockquote().run();
          }}
          disabled={!editor.can().unsetBlockquote()}
          className="text-black p-2"
        >
          <BsTextIndentRight className="w-5 h-5" />
        </button>
        <JustifyToolbar editor={editor} content={content} />
        <ImageToolbar
          editor={editor}
          content={content}
          imageContent={imageContent}
          setImageContent={setImageContent}
          tmpImg={tmpImg}
          setTmpImg={setTmpImg}
        />
        <LinkToolbar  editor={editor}
          content={content}/>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <LuUndo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <LuRedo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;