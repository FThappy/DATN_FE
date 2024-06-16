import { userRequest } from "@/utils/requestMethod";

export const getUserDonate = async (page: number , projectId : string) => {
  try {
    const res = await userRequest.get("/api/transcation/project", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page,
        projectId: projectId,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
