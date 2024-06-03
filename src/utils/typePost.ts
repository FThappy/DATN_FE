
export type PostProps = {
  _id : string;
  userId: string ;
  userName : string;
  organizationName : string;
  document: string;
  img: string[];
  filePath: string;
  privacy: string;
  isLock: boolean;
  createdAt : Date;
  updatedAt : Date;
  __v : number;
};