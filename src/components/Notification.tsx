import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IoIosNotifications } from "react-icons/io";
import { socket } from "@/utils/requestMethod";
import toastifyUtils from "@/utils/toastify";
import { NotificationProps } from "@/utils/typeNotification";
import NotificationCard from "./NotificationCard";
import { useInView } from "react-intersection-observer";
import NotificationSkeleton from "./NotificationSkeleton";
import { getNotifications } from "@/actions/getNotifications";
import { getTotalNotifications } from "@/actions/getTotalNotification";
import { userStore } from "@/store/userStore";

type Props = {};

const Notification = (props: Props) => {
  const { ref, inView } = useInView();

  const [numberNotifications, setNumberNotifications] = useState<number>(0);

  const [page, setPage] = useState<number>(0);

  const [end, setEnd] = useState<boolean>(true);

  const user = userStore((state: any) => state?.user);

  const [listNewNotifications, setListNewNotifications] = useState<
    NotificationProps[]
  >([]);

  const [listNotifications, setListNotifications] = useState<
    NotificationProps[]
  >([]);

  const getListNotifications = async (): Promise<void> => {
    try {
      const res = await getNotifications(page, listNewNotifications.length);
      if (res.code === 4) {
        toastifyUtils("error", "Lỗi server");
      }
      if (res.data.length < 8) {
        setEnd(false);
      }
      if (res.code === 0) {
        setListNotifications((prev) => [...prev, ...res.data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
      toastifyUtils("error", "Lỗi server");
    }
  };

  useEffect(() => {
    // Hàm để gọi listPost và cập nhật state posts
    if (inView) {
      getListNotifications();
    }
  }, [inView]);

  useEffect(() => {
    const getTotal = async (): Promise<void> => {
      try {
        const res = await getTotalNotifications();
        if (res.code === 0) {
          setNumberNotifications(res.data);
        }
      } catch (error) {
        console.log(error);
        toastifyUtils("error", "Lỗi server");
      }
    };
    getTotal();
  }, []);

  useEffect(() => {
    socket.off("error-notification").on("error-notification", (error) => {
      return toastifyUtils("error", error.message);
    });

    return () => {
      socket.off("error-notification");
    };
  }, []);
  useEffect(() => {
    socket.emit("join-private-notification", user?.id);
  }, [user]);
  useEffect(() => {
    const handleNew = (newNotification: NotificationProps) => {
      console.log(newNotification);
      setListNewNotifications((prev) => [newNotification, ...prev]);
      setNumberNotifications((prev) => {
        return prev + 1;
      });
    };
    socket.on("notification-req", handleNew);
    return () => {
      socket.off("notification-req");
    };
  }, []);

  const handleRemoveNewNotification = (index: number, type: string) => {
    if (type === "new") {
      setListNewNotifications((prev) => {
        const newList = [...prev];
        newList.splice(index, 1);
        return newList;
      });
    } else {
      setListNotifications((prev) => {
        const newList = [...prev];
        newList.splice(index, 1);
        return newList;
      });
    }

    setNumberNotifications((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  useEffect(() => {
    const handleRemoveNotification = (notificationId: string) => {
      setListNewNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );
      setListNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );
      setNumberNotifications((prev) => {
        if (
          listNewNotifications.findIndex((item) => item._id === notificationId)
        ) {
          return prev - 1;
        }
        if (
          listNotifications.findIndex((item) => item._id === notificationId)
        ) {
          return prev - 1;
        }
        return prev;
      });
    };
    socket.on("remove-notification", handleRemoveNotification);
    return () => {
      socket.off("remove-notification");
    };
  }, []);

  useEffect(() => {
    const handleUpdateNotification = (newNotification: NotificationProps) => {
      setListNewNotifications((prev) =>
        prev.map((notification) =>
          notification._id === newNotification._id
            ? newNotification
            : notification
        )
      );
      setListNotifications((prev) =>
        prev.map((notification) =>
          notification._id === newNotification._id
            ? newNotification
            : notification
        )
      );
      console.log("a")
      setNumberNotifications((prev) => {
        if (
          listNewNotifications.findIndex(
            (item) => item._id === newNotification._id
          )
        ) {
          return prev + 1;
        }
        if (
          listNotifications.findIndex(
            (item) => item._id === newNotification._id
          )
        ) {
          return prev + 1;
        }
        return prev;
      });
    };
    socket.on("update-notification", handleUpdateNotification);
    return () => {
      socket.off("update-notification");
    };
  }, []);

  const handleChangeRead = (
    newNotification: NotificationProps,
    type: string
  ) => {
    if (type === "new") {
      setListNewNotifications((prev) => {
        const newList = [...prev];
        const index = newList.findIndex(
          (item) => item._id === newNotification._id
        );
        newList.splice(index, 1, newNotification);
        return newList;
      });
    } else {
      setListNotifications((prev) => {
        const newList = [...prev];
        const index = newList.findIndex(
          (item) => item._id === newNotification._id
        );
        newList.splice(index, 1, newNotification);
        return newList;
      });
    }
    setNumberNotifications((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-[60px] w-[60px] cursor-pointer flex items-center justify-center gap-2 rounded-full bg-gray-200 relative">
          <IoIosNotifications size={36} />
          {numberNotifications > 0 && (
            <div
              className="absolute top-0 right-0 h-[15px] w-[15px] flex items-center justify-center rounded-full
           bg-red text-white font-medium text-[0.5rem]"
            >
              {numberNotifications}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-2 w-[25rem] max-h-[calc(80vh-8rem)] min-h-[calc(80vh-8rem)] overflow-y-scroll z-[100]">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[1.2rem]">Danh sách thông báo :</p>
          {listNewNotifications.length > 0 &&
            listNewNotifications.map((newNotification, index) => (
              <div key={index} className="w-full">
                <NotificationCard
                  notification={newNotification}
                  index={index}
                  handleRemoveNewNotification={handleRemoveNewNotification}
                  type="new"
                  handleChangeRead={handleChangeRead}
                />
              </div>
            ))}
          {listNotifications.length > 0 &&
            listNotifications.map((notification, index) => (
              <div key={index} className="w-full">
                <NotificationCard
                  notification={notification}
                  index={index}
                  handleRemoveNewNotification={handleRemoveNewNotification}
                  type="old"
                  handleChangeRead={handleChangeRead}
                />
              </div>
            ))}
          {end ? (
            <div ref={ref}>
              <NotificationSkeleton />
              <NotificationSkeleton />
            </div>
          ) : (
            <p className="text-center text-[1.5rem] my-4 text-gray-400 font-bold">
              Đã hết thông báo
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
