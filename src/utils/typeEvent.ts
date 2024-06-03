export type EventProps = {
  _id: string;
  userId: string;
  eventName: string;
  timeStart: Date;
  timeEnd: Date;
  wallImg: string[];
  filePath: string;
  city: string;
  address: string;
  description: string;
  isLock: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
