"use server"
import { userRequest } from "@/utils/requestMethod";
import { UserRegister } from "@/utils/typeAuth";

export const register = async (
  inforRegister: UserRegister,
  formData: FormData,
  type : string
) => {
  const data = {
    inforRegister: inforRegister,
    otp: formData.get("otp"),
    type : type
  };
  try {
    const res = await userRequest.post("/api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
