"use client";

import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import Toolbar from "../Toolbar";

type Props = {
  content: string;
  onChange: (newContent: string) => void;
  imageContent: File[];
  setImageContent: React.Dispatch<React.SetStateAction<File[]>>;
  contentJSON: JSONContent;
  setContentJSON: React.Dispatch<React.SetStateAction<JSONContent>>;
  tmpImg: any[];
  setTmpImg: React.Dispatch<React.SetStateAction<any[]>>;
};

const TiptapUpdate = ({
  onChange,
  content,
  imageContent,
  setImageContent,
  contentJSON,
  setContentJSON,
  tmpImg,
  setTmpImg,
}: Props) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ImageResize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col bg-white px-6 py-3 max-h-[40rem] min-h-[40rem] overflow-y-scroll border-b border-r border-l border-gray-700  w-[55rem] h-[40rem] gap-3 pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor, transaction }) => {
      setContentJSON(editor.getJSON());
      handleChange(editor.getHTML());
    },

    content: contentJSON,
  });

  return (
    <div className="">
      <Toolbar
        editor={editor}
        content={content}
        imageContent={imageContent}
        setImageContent={setImageContent}
        tmpImg={tmpImg}
        setTmpImg={setTmpImg}
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapUpdate;
