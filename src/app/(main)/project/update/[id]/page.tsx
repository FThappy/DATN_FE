"use client";
import { getProjectById } from "@/actions/getProjectById";
import UpdateProject from "@/components/project/UpdateProject";
import { Skeleton } from "@/components/ui/skeleton";
import { userStore } from "@/store/userStore";
import toastifyUtils from "@/utils/toastify";
import { ProjectProps } from "@/utils/typeProject";
import { notFound} from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";


type Props = {};

const Page = ({ params }: { params: { id: string } }) => {
  const user = userStore((state: any) => state?.user);

  const [project, setProject] = useState<ProjectProps>();
  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await getProjectById(params.id);
        if (res.code === 3) {
          return notFound();
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
        throw new Error("Server Error");
      }
    };

    getEvent();
  }, [params.id]);
      if (!project) {
        return (
          <div className="flex w-full justify-center">
            <Skeleton className="w-[55rem] h-[50rem]" />
          </div>
        );
      } else{
        if(user?.id !== project.userId ){
          return toastifyUtils("warning", "Bạn không đủ thẩm quyền");
        }
      }
      return (
        <>
        {project && <UpdateProject  project={project} />}
        </>
      )

};

export default Page;
