import { userRequest } from "@/utils/requestMethod";

export const getNotifications = async (page: number, skipItem : number) => {
  try {
    const res = await userRequest.get("/api/notification/id", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page,
        skipItem : skipItem 
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
