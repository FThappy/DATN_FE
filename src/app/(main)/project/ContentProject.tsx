"use client";

import { getProject } from "@/actions/getProject";
import { searchProject } from "@/actions/searchProject";
import ProjectCard from "@/components/project/ProjectCard";
import SearchProjectContainer from "@/components/project/SearchProjectContainer";
import { Skeleton } from "@/components/ui/skeleton";
import toastifyUtils from "@/utils/toastify";
import { ProjectProps } from "@/utils/typeProject";
import Link from "next/link";
import {  useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";

type Props = {};
type DataSearch = {
  qSearch: string | undefined;
  qType: string[] | undefined;
  qSort: string | undefined;
  qCity: string | undefined;
  page: number;
};
const colors = ["#F84D42", "#FFB840", "#20b86d"];
const ContentProject = (props: Props) => {
  const searchParams = useSearchParams();

  const pSearch = searchParams.get("qSearch");

  const pType = searchParams.get("qType");

  const pSort = searchParams.get("qSort");

  const pCity = searchParams.get("qCity");

  const router = useRouter();

  const [page, setPage] = useState<number>(0);

  const [pageSearch, setPageSearch] = useState<number>(0);

  const [endProject, setEndProject] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [project, setProject] = useState<ProjectProps[]>([]); // State để lưu trữ danh sách bài đăng

  const [qSearch, setQSearch] = useState<string | undefined>(
    pSearch && pSearch !== "undefined" ? pSearch : undefined
  );

  const [qType, setQType] = React.useState<string[] | undefined>(
    pType && pType !== "undefined" ? pType.split(",") : undefined
  );

  const [qSort, setQSort] = useState<string>(pSort ? pSort : "");

  const [qCity, setQCity] = useState<string>(
    pCity && pCity !== "undefined" ? pCity : ""
  );
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const getListProject = async (): Promise<void> => {
    setIsLoading(true);
    // console.log(page)
    try {
      const res = await getProject(page);
      if (res.code === 4) {
        setIsLoading(false);

        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 8) {
        setIsLoading(false);
        setEndProject(false);
      }
      if (res.code === 0) {
        setIsLoading(false);
        setProject((prevProject) => [...prevProject, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  const handlePushPrams = (
    qType: string[] | undefined,
    qSearch: string | undefined,
    qSort: string,
    qCity: string,
    isQSearch: boolean
  ) => {
    setProject([]);
    setPage(0);
    if (isQSearch) {
      setPageSearch(0);
    } else {
      setPageSearch(0);
    }
    setEndProject(true);
    router.push(
      `/project?qType=${qType}&&qSearch=${qSearch}&&qSort=${qSort}&&qCity=${qCity}`
    );
  };


  const handleSearch = async () => {
    setIsLoading(true);
    console.log(pageSearch);
    try {
      const dataSend: DataSearch = {
        qSearch: qSearch ? qSearch : undefined,
        qType: qType ? qType : [],
        qSort: qSort !== "" ? qSort : "new",
        qCity: qCity !== "" ? qCity : undefined,
        page: pageSearch,
      };
      const res = await searchProject(dataSend);
      if (res.code === 4) {
        setIsLoading(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 8) {
        setIsLoading(false);
        setEndProject(false);
      }
      if (res.code === 0) {
        setIsLoading(false);
        setProject((prevProject) => [...prevProject, ...res.data]);
        setPageSearch((prev) => prev + 1);
      }
      console.log(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return toastifyUtils("error", "Lỗi server");
    }
  };
  const handleQSearch = async (page: number) => {
    setIsLoading(true);
    try {
      const dataSend: DataSearch = {
        qSearch: qSearch ? qSearch : undefined,
        qType: qType ? qType : [],
        qSort: qSort !== "" ? qSort : "new",
        qCity: qCity !== "" ? qCity : undefined,
        page: page,
      };
      const res = await searchProject(dataSend);
      if (res.code === 4) {
        setIsLoading(false);
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 8) {
        setIsLoading(false);
        setEndProject(false);
      }
      if (res.code === 0) {
        setIsLoading(false);
        setProject((prevProject) => [...prevProject, ...res.data]);
        setPageSearch((prev) => prev + 1);
      }
      console.log(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return toastifyUtils("error", "Lỗi server");
    }
  };
  const handleLoadMore = () => {
    if (
      (qSearch && qSearch !== "undefined") ||
      (qType && qType.length > 0) ||
      (qSort && qSort !== "") ||
      qCity
    ) {
      // console.log("a");
      handleSearch();
    } else {
      // console.log("b");
      getListProject();
    }
  };

  useEffect(() => {
    if (
      (qSearch && qSearch !== "undefined") ||
      (qType && qType.length > 0) ||
      (qSort && qSort !== "") ||
      qCity
    ) {
      // console.log("aa");
      handleSearch();
    } else {
      // console.log("bb");
      getListProject();
    }
  }, [qCity, qSort, qType]);

  return (
    <div className="relative h-auto w-full bg-white px-16 pt-1 flex flex-col items-center pb-[2.1rem]">
      <SearchProjectContainer
        qSearch={qSearch}
        qType={qType}
        qCity={qCity}
        qSort={qSort}
        setQCity={setQCity}
        setQSort={setQSort}
        setQType={setQType}
        setQSearch={setQSearch}
        handlePushParams={handlePushPrams}
        handleSearch={handleSearch}
        handleQSearch={handleQSearch}
        setPageSearch={setPageSearch}
        setPage={setPage}
      />
      {!isSearch ? (
        <>
          {" "}
          <div className="grid grid-cols-4 gap-2 w-full mt-2 mb-2">
            {project &&
              project.map((cause, index) => (
                <div key={index}>
                  <ProjectCard cause={cause} color={colors[index % 3]} />
                </div>
              ))}
          </div>
          {isLoading ? (
            <div className="w-full grid grid-cols-4 gap-2  mt-2 mb-2">
              <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
              <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
              <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
              <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
            </div>
          ) : (
            <></>
          )}
          <Link
            href={"/project/create"}
            className="fixed	 bottom-[1rem] right-[0.5rem]"
          >
            <div className="shadow-beautiful bg-white w-[4rem] h-[4rem] cursor-pointer flex items-center justify-center hover:bg-gray-100 p-2  rounded-full">
              <IoCreateOutline size={24} />
            </div>
          </Link>
          {endProject ? (
            <button
              className="flex items-center justify-center font-bold bg-red hover:bg-green  text-white p-2 mt-2 mb-2"
              onClick={handleLoadMore}
            >
              - Tải thêm dự án -
            </button>
          ) : (
            <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
              - Đã hết dự án -
            </p>
          )}
        </>
      ) : (
        <div className="w-full grid grid-cols-4 gap-2  mt-2 mb-2">
          <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
          <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
          <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
          <Skeleton className="w-full h-[35rem] flex items-center justify-between gap-2 p-2 rounded-[0.8rem]" />
        </div>
      )}
    </div>
  );
};

export default ContentProject;
