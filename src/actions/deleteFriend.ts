import { userRequest } from "@/utils/requestMethod";

export const deleteFriend = async (userId: string) => {
  try {
    const res = await userRequest.delete("/api/friend/id", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
