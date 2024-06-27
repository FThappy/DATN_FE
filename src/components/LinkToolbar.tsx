"use client";
import { Editor } from "@tiptap/react";
import React, { useCallback } from "react";
import { LuLink2, LuYoutube } from "react-icons/lu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props = {
  editor: Editor | null;
  content: string;
};

const LinkToolbar = ({ editor, content }: Props) => {
  const [height, setHeight] = React.useState<number>(480);
  const [width, setWidth] = React.useState<number>(640);
  const [linkYoutube, setLinkYoutube] = React.useState<string>("");
  const [open , setOpen] = React.useState<boolean>(false)
  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

    const handleLinkYoutube = useCallback(() => {
      if (!editor) {
        return;
      }
      // cancelled
      if (!linkYoutube) {
        return;
      }
      editor
        .chain()
        .focus()
        .insertContent([
          {
            type: "youtube",
            attrs: {
              src: linkYoutube,
              width: Math.max(320, width) || 900,
              height: Math.max(180, height) || 650,
            },
          },
        ])
        .run();
        setOpen(false)
        setHeight(0)
        setWidth(0);
        setLinkYoutube("")
    }, [editor, linkYoutube, height , width]);
  if (!editor) {
    return null;
  }

  return (
    <div className="flex">
      <button
        onClick={(e) => {
          e.preventDefault();
          setLink();
        }}
        className={
          editor.isActive("link")
            ? "bg-gray-400 p-2 rounded-[8px]"
            : "text-black p-2"
        }
      >
        <LuLink2 className="w-5 h-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div>
            {" "}
            <div
              //   onClick={(e) => {
              //     e.preventDefault();
              //     editor.chain().focus().toggleBold().run();
              //   }}
              className={
                editor.isActive("bold")
                  ? "bg-gray-400 p-2 rounded-[8px]"
                  : "text-black p-2"
              }
            >
              <LuYoutube className="w-5 h-5" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-2 p-2 w-[35rem] rounded-[8px]">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <label htmlFor="width" className="font-medium">
                Chiều dài
              </label>
              <input
                id="width"
                type="number"
                min="320"
                max="1024"
                placeholder="width"
                value={width}
                onChange={(event) => setWidth(event.target.valueAsNumber)}
                className="w-[10rem] shadow-beautiful bg-white outline-none rounded-[8px] p-2"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="height" className="font-medium">
                Chiều rồng
              </label>
              <input
                id="height"
                type="number"
                min="180"
                max="720"
                placeholder="height"
                value={height}
                onChange={(event) => setHeight(event.target.valueAsNumber)}
                className="w-[10rem] shadow-beautiful bg-white outline-none rounded-[8px] p-2"
              />
            </div>
          </div>
          <input
            id="url"
            type="text"
            placeholder="link youtube"
            value={linkYoutube}
            onChange={(event) => setLinkYoutube(event.target.value)}
            className="w-full shadow-beautiful bg-white rounded-[10px] p-2"
          />
          <div>
            <button
              className="p-2 rounded-[8px] text-white"
              style={{
                background: linkYoutube ? "#F84D42" : "#20b86d",
              }}
              disabled={!linkYoutube}
              onClick={(e) => {
                e.preventDefault();
                handleLinkYoutube();
              }}
            >
              Xác nhận
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinkToolbar;
