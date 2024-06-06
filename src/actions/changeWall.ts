"use server";
import { cookies } from "next/headers";
import { userRequest } from "@/utils/requestMethod";

export const changeWall = async (formData: FormData, userId : string) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.post(`/api/user/wall/${userId}`, formData, {
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
