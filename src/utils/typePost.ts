
export type PostProps = {
  _id : string;
  userId: string ;
  document: string;
  img: string[];
  filePath: string;
  privacy: string;
  isLock: boolean;
  isDelete : boolean;
  createdAt : Date;
  updatedAt : Date;
  __v : number;
  typeShare : string;
  linkItem: string;
};

export type SharePostProps = {
  document: string | undefined;
  typeShare: string;
  linkItem: string;
  privacy: string;
};