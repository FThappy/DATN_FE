"use client";
import { getProjectById } from "@/actions/getProjectById";
import SlideWallImg from "@/components/event/SlideWallImg";
import { Skeleton } from "@/components/ui/skeleton";
import { timeCountDown, timeFormatCustom } from "@/utils/timeSend";
import toastifyUtils from "@/utils/toastify";
import { ProjectProps } from "@/utils/typeProject";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import TextAlign from "@tiptap/extension-text-align";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<ProjectProps>();

  const router = useRouter();
  const output = useMemo(() => {
    if (project && project.content) {
      return generateHTML(project.content, [
        StarterKit,
        Underline,
        ImageResize,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ]);
    }
    return "";
  }, [project]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await getProjectById(params.id);
        if (res.code === 3) {
          router.push("/404");
        }
        if (res.code === 9) {
          return toastifyUtils("error", "Dự án của bạn đã bị khóa");
        }
        if (res.code === 4) {
          throw new Error("Server Error");
        }
        setProject(res.project);
      } catch (error) {
        console.error("Server Error", error);
      }
    };

    getProject();
  }, [params.id]);
  return (
    <div className="bg-[#f1eff4d1] shadow-beautiful w-full pb-4">
      <div className="flex flex-col w-full relative">
        {project?.image && project?.image.length > 0 ? (
          <SlideWallImg listWallImg={project.image} />
        ) : (
          <div className="bg-gray-200 w-full desktop:h-[30rem] laptop:h-[25rem] relative"></div>
        )}{" "}
        <div className="absolute shadow-beautiful bg-white w-[7rem] h-[7rem] bottom-4 left-20 rounded-[12px]">
          <div className="bg-red h-[2rem] rounded-t-[12px]"></div>
          <div className="flex justify-center items-center w-full h-[5rem] text-[3.5rem] font-bold  ">
            {project?.timeEnd && timeCountDown(project.timeEnd)}
          </div>
        </div>
      </div>
      <div className="px-20 bg-white">
        {" "}
        <p className="font-bold	text-red text-[1.2rem]">
          Kết thúc{" "}
          {project?.timeEnd && timeFormatCustom(new Date(project.timeEnd))}
        </p>
        <p className="font-medium	 text-[2rem]">{project?.projectName}</p>
        <p className="font-medium	text-gray-400">{project?.city}</p>
        <div className="flex justify-between items-center w-full  ">
          <div className="flex gap-2 items-center "></div>
        </div>
      </div>{" "}
      <div className="border-slate-300 w-full h-[1px] border-t-[1px] "></div>
      <div className="flex items-center justify-center w-full  bg-white">
        {" "}
        <div className="w-[55rem] mt-4">
          {" "}
          <div>{project?.description}</div>
          <div className="flex gap-2 items-center">
            <FaCalendarAlt size={12} />
            {project?.createdAt &&
              format(new Date(project.createdAt), "dd 'Tháng' MM, yyyy", {
                locale: vi,
              })}
          </div>
          <div className="border-slate-300 w-full h-[1px] border-t-[1px] mt-2 mb-2"></div>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>
    </div>
  );
};

export default Page;
