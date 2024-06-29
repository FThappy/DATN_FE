import { userRequest } from "@/utils/requestMethod";

export const createMessage= async (formData: FormData) => {
  try {
    const res = await userRequest.post("/api/message", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
