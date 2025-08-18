import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Editor } from '@tiptap/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { LuAlignJustify, LuAlignLeft, LuAlignRight, LuAlignCenter } from 'react-icons/lu';

type Props = {
  editor: Editor | null;
  content: string;
};

const JustifyToolbar = ({ editor, content }: Props) => {
  const [openPopover, setOpenPopover] = useState(false);

  if (!editor) {
    return null;
  }
  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <div className='w-[3rem] px-1 border-x-2 border-slate-400 flex items-center justify-center gap-2'>
          {editor.isActive({ textAlign: 'left' }) && <LuAlignLeft className='w-5 h-5' />}
          {editor.isActive({ textAlign: 'center' }) && <LuAlignCenter className='w-5 h-5' />}
          {editor.isActive({ textAlign: 'right' }) && <LuAlignRight className='w-5 h-5' />}
          {editor.isActive({ textAlign: 'justify' }) && <LuAlignJustify className='w-5 h-5' />}
          <IoMdArrowDropdown />
        </div>
      </PopoverTrigger>
      <PopoverContent className='flex  gap-2 items-start p-1 outline-none w-[12rem]'>
        <button
          onClick={e => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('left').run();
          }}
          className={`
            ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-400 p-1 rounded-[8px]' : 'text-black p-1'}
              w-full   outline-none flex justify-center items-center
              `}
        >
          <LuAlignLeft className='w-5 h-5' />
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('center').run();
          }}
          className={`
            ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-400 p-1 rounded-[8px]' : 'text-black p-1'}
              w-full   outline-none flex justify-center items-center
              `}
        >
          <LuAlignCenter className='w-5 h-5' />
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('right').run();
          }}
          className={`
            ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-400 p-1 rounded-[8px]' : 'text-black p-1'}
              w-full  outline-none flex justify-center items-center
              `}
        >
          <LuAlignRight className='w-5 h-5' />
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('justify').run();
          }}
          className={`
            ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-400 p-1 rounded-[8px]' : 'text-black p-1'}
              w-full outline-none flex justify-center items-center
              `}
        >
          <LuAlignJustify className='w-5 h-5' />
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default JustifyToolbar;
