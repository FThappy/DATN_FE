"use server";
import { userRequest } from "@/utils/requestMethod";
import { cookies } from "next/headers";

type DataSearch = {
  qSearch: string | undefined;
  qDate: Date | undefined;
  qSort: string | undefined;
  qCity: string | undefined;
  page: number;
};

export const searchEventOwner = async (dataSend: DataSearch) => {
  const cookie = cookies().get("Authorization");

  try {
    const res = await userRequest.post(`api/event/owner/search`, dataSend, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authorization=${cookie?.value}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
