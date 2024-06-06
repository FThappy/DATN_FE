import { differenceInDays, differenceInHours } from "date-fns";

export const timeSend = (createdAt : Date)=>{
 
  return differenceInHours(new Date(), new Date(createdAt)) <= 0
    ? "Vài phút trước"
    : differenceInHours(new Date(), new Date(createdAt)) >= 24
    ? differenceInDays(new Date(), new Date(createdAt)) + " ngày trước"
    : differenceInHours(new Date(), new Date(createdAt)) + "h";
}

export const timeFormatCustom = (date : Date)=>{
  
  return ` ${date.getDate()} Tháng ${date.getMonth() + 1} Năm ${
    date.getFullYear() + 1
  } Lúc ${date.getHours() < 10 ? 0 : ""}${date.getHours()}:${
    date.getMinutes() < 10 ? 0 : ""
  }${date.getMinutes()} `;
}

export const timeCountDown = (timeEnd: Date) => {
  return differenceInHours(new Date(timeEnd),new Date()) <= 0
    ? "0"
    : differenceInHours(new Date(timeEnd),new Date()) >= 24
    ? differenceInDays(new Date(timeEnd),new Date() )
    : differenceInHours(new Date(timeEnd),new Date()) + "h";
};