import { userRequest } from "@/utils/requestMethod";

export const refuseAddFriend = async (userId: string) => {
  try {
    const res = await userRequest.delete("/api/reqAddFriend/refuse", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        userId: userId,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
