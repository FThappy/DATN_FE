import { userRequest } from "@/utils/requestMethod";

export const login = async (data: {
  username: FormDataEntryValue;
  password: string;
}) => {
  try {
    const res = await userRequest.post(`api/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
