import { userRequest } from '@/utils/requestMethod';
type UpdateSharePost = {
  document: string;
  privacy: string;
  postId: string;
};
export const updateChangeSharePost = async (dataSend: UpdateSharePost) => {
  try {
    const res = await userRequest.put('/api/post/share', dataSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
