import { userRequest } from "@/utils/requestMethod";

export const createLike = async (itemId : string, type : string) => {
  try {
    const res = await userRequest.post("/api/like", {
        itemId: itemId,
        type: type
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
