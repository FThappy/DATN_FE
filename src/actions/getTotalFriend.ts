import { userRequest } from "@/utils/requestMethod";

export const getTotalFriend = async () => {
  try {
    const res = await userRequest.get("/api/friend/total", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
