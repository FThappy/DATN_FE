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
import { userStore } from "@/store/userStore";
import ReportModal from "@/components/ReportModal";
import { BiSolidCommentError, BiSolidPencil } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";
import ModalDeleteProject from "@/components/project/ModalDeleteProject";
import ModalTranscation from "@/components/project/ModalTranscation";
import ListDonate from "@/components/project/ListDonate";
import ProjectCommentContainer from "@/components/project/ProjectCommentContainer";

type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<ProjectProps>();

  const user = userStore((state: any) => state?.user);

  const [openPopover, setOpenPopover] = useState(false);

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
    <div className=" shadow-beautiful w-full pb-4">
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
      <div className="px-20 bg-white flex items-center justify-between w-full">
        {project ? (
          <div>
            <p className="font-bold	text-red text-[1.2rem]">
              Kết thúc{" "}
              {project?.timeEnd && timeFormatCustom(new Date(project.timeEnd))}
            </p>
            <p className="font-medium	 text-[2rem]">{project?.projectName}</p>
            <p className="font-medium	text-gray-400">{project?.city}</p>
          </div>
        ) : (
          <Skeleton className="h-[5rem] w-[8rem] mt-2 mb-2" />
        )}
        <div className="flex  items-center gap-2  ">
          {project?.userId ? (
            user?.id !== project?.userId ? (
              <>
                <ReportModal
                  postId={project._id}
                  type="project"
                  userId={user?.id}
                  setOpenPopover={setOpenPopover}
                >
                  <div className="h-[3rem] flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] ">
                    <BiSolidCommentError size={24} />
                    <p className="font-bold text-[1.1rem]">Báo cáo sự kiện</p>
                  </div>
                </ReportModal>
                <ModalTranscation projectId={project._id} userId={user?.id} />
              </>
            ) : (
              <>
                <Link
                  href={`/project/update/${project._id}`}
                  className="h-[3rem] flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] "
                >
                  <BiSolidPencil size={24} />
                  <p className="font-bold text-[1.1rem]">Sửa dự án</p>
                </Link>
                <ModalDeleteProject userId={user.id} projectId={project._id} />
              </>
            )
          ) : (
            <>
              <Skeleton
                className="h-[3rem] w-[10rem] 
                flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] "
              />
              <Skeleton
                className="h-[3rem] w-[10rem] 
                flex items-center p-2 px-4 gap-2 bg-gray-200 hover:bg-gray-300 rounded-[8px] "
              />
            </>
          )}
        </div>
      </div>{" "}
      <div className="border-slate-300 w-full h-[1px] border-t-[1px] "></div>
      <div className="flex  justify-center w-full  bg-white">
        {project ? (
          <div className="w-[55rem] mt-4 pb-2">
            {" "}
            <div className="flex w-full justify-between">
              <div>
                <div>{project?.description}</div>
                <div className="flex gap-2 items-center">
                  <FaCalendarAlt size={12} />
                  {project?.createdAt &&
                    format(new Date(project.createdAt), "dd 'Tháng' MM, yyyy", {
                      locale: vi,
                    })}
                </div>
              </div>
              <div className="flex flex-wrap items-center w-[80%] gap-2 justify-end">
                {project && project.type.length > 0
                  ? project.type.map((item, index) => (
                      <div key={index} className=" h-[2rem] relative">
                        <p className="bg-gray-200 rounded-[10px] p-2">{item}</p>
                        <div
                          className="absolute top-[-2px] right-[-2px] bg-white rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        ></div>
                      </div>
                    ))
                  : " Chưa có thể loại"}
              </div>
            </div>
            <div className="border-slate-300 w-full h-[1px] border-t-[1px] mt-2 mb-2"></div>
            <div dangerouslySetInnerHTML={{ __html: output }} />
            {user && project ? <ProjectCommentContainer user={user} project={project} /> : <Skeleton className="w-full h-[30rem] rounded-sm"/>}
          </div>
        ) : (
          <Skeleton className="h-[50rem] w-[55rem] mb-4 mt-2" />
        )}
        <div className="border-slate-300 w-[1px] h-[50rem] border-[1px] ml-[1rem] mt-4 "></div>
        <div className="w-[25rem] mt-2 pb-2 ml-2">
          <div className="flex flex-col p-2">
            {project ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex w-full justify-between">
                  <p className="text-left text-[1rem] font-medium text-gray-400">
                    Số tiền đã nhận được :
                  </p>
                  <p className="text-right text-[1rem] font-medium text-red">
                    {project.rise
                      ? project.rise.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "0VND"}
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <p className="text-left text-[1rem] font-medium text-gray-400">
                    Số tiền mong muốn :
                  </p>
                  <p className="text-right text-[1rem] font-medium text-red">
                    {project.goal
                      ? project.goal.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "0VND"}
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="w-full h-[5rem]" />
            )}

            <div className="border-slate-300 w-full h-[1px] border-t-[1px] mt-2 mb-2"></div>
            {project ? (
              <div className="flex flex-col shadow-beautiful bg-white rounded-[8px] w-full h-auto p-2 px-4 overflow-y-scroll max-h-[40rem]">
                <p className="font-bold text-[1.2rem]">Lịch sử nhận hỗ trợ :</p>
                <ListDonate projectId={project._id}/>
              </div>
            ) : (
              <Skeleton className="w-full h-[30rem]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
