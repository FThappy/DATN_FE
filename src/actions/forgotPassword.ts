"use server";
import { userRequest } from "@/utils/requestMethod";

export const forgotPassword = async (dataSend: string) => {
  try {
    const res = await userRequest.post(
      "/api/auth/forgotPassword",
      { email: dataSend },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
