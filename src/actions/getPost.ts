"use server";

import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

export const getPost = async (page : number) => {

  const cookie = cookies().get("Authorization");
    console.log(cookies().getAll());
    console.log(cookies().get("_vercel_jwt"));
    console.log(cookies().get("Authorization"));
  try {
    const res = await userRequest.get("/api/post", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
      params: {
        page: page,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
