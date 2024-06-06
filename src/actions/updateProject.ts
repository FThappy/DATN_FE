"use server";
import { cookies } from "next/headers";
import { userRequest } from "@/utils/requestMethod";

export const updateProject = async (formData: FormData, projectId: string) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.put("/api/project/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `Authorization=${cookie?.value}`,
      },
      params: {
        projectId: projectId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
