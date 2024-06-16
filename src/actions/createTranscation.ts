import { userRequest } from "@/utils/requestMethod";

export const createTranscation = async (projectId : string , amount :number) => {
  try {
    const res = await userRequest.post("/api/transcation/zalopay", {
        projectId : projectId,
        amount : amount
    }, {
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
