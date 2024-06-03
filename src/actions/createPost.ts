"use server"
import { cookies } from "next/headers";
import { userRequest } from "@/utils/requestMethod";

export const createPost = async (
  formData: FormData
) => {
    const cookie = cookies().get('Authorization')
  try {
    const res = await userRequest.post("/api/post/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `Authorization=${cookie?.value}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.data
  }
};
