"use server";
import { userRequest } from "@/utils/requestMethod";

export const forgotPassword = async (dataSend: string, type : string) => {
  try {
    const res = await userRequest.post(
      "/api/auth/forgotPassword",
      { email: dataSend, type: type},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
