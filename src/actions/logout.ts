import { userRequest } from "@/utils/requestMethod";

export const logout = async () => {

  try {
    const res = await userRequest.delete(`api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};