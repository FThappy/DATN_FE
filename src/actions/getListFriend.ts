import { userRequest } from "@/utils/requestMethod";

export const getListFriend= async (page : number) => {
  try {
    const res = await userRequest.get("/api/friend/id", {
      headers: {
        "Content-Type": "application/json",
      },
      params:{
        page : page
      }
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
