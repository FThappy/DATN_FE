import { userRequest } from "@/utils/requestMethod";

export const getNotifiTrans = async (projectId: string) => {
  try {
    const res = await userRequest.get("/api/notification/trans", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        projectId: projectId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
