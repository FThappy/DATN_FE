import { userRequest } from "@/utils/requestMethod";

export const getNoFriend = async (page: number) => {
  try {
    const res = await userRequest.get("/api/friend/new", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
