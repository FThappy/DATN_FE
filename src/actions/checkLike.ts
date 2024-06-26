import { userRequest } from "@/utils/requestMethod";

export const checkLike = async (itemId: string) => {
  try {
    const res = await userRequest.get("/api/like/check", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        itemId: itemId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
