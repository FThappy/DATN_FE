import { userRequest } from "@/utils/requestMethod";

export const getUserLike = async (number: number) => {
  try {
    const res = await userRequest.get("/api/user/like", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        number: number,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
