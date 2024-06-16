import { userRequest } from "@/utils/requestMethod";

export const getCertainOTP = async (email : string , type : string , message : string) => {
  try {
    const res = await userRequest.post(
      "/api/auth/otp-certain",
      { email: email, type: type, message: message },
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
