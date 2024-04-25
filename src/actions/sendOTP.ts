"use server";
import { userRequest } from "@/utils/requestMethod";

export const sendOTP = async (dataSend: string) => {
  try {
    const res = await userRequest.post(
      "/api/auth/otp",
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
