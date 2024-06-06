"use server";
import { cookies } from "next/headers";
import { userRequest } from "@/utils/requestMethod";

export const createProject = async (formData: FormData) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.post("/api/project/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `Authorization=${cookie?.value}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};