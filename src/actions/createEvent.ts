"use server";
import { cookies } from "next/headers";
import { userRequest } from "@/utils/requestMethod";

export const createEvent = async (formData: FormData) => {
  const cookie = cookies().get("Authorization");
  try {
    const res = await userRequest.post("/api/event/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `Authorization=${cookie?.value}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
