import { useState } from "react";
import { NotificationType } from "./constants";
import { Notification } from "./Notification";

interface triggerNotificationProps {
  message: string;
  type: NotificationType;
  duration: number;
}

type TNotification = { id: number; message: string; bgColor: string; duration: number };
type NotificationPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export const useNotification = (position: NotificationPosition) => {
  const colorToNotificationType = {
    [NotificationType.INFO]: "bg-blue-500",
    [NotificationType.SUCCESS]: "bg-green-500",
    [NotificationType.WARNING]: "bg-orange-500",
    [NotificationType.ERROR]: "bg-red-500",
  };

  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const bottomPositions = ["bottom-left", "bottom-right", "bottom-center"];
  const triggerNotification = ({ message, type , duration}: triggerNotificationProps) => {
    setNotifications((prev) => {
      if (bottomPositions.includes(position))
        return [
          {
            id: Date.now(),
            message,
            bgColor: colorToNotificationType[type],
            duration
          },
          ...prev,
        ];
      else
        return [
          ...prev,
          {
            id: Date.now(),
            message,
            bgColor: colorToNotificationType[type],
            duration
          },
        ];
    });
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((x) => x.id !== id));
  };

  const NotificationComponent = (
    <div
      className={`${position} flex flex-col items-center gap-4 absolute m-6 w-1/4`}
    >
      {notifications.map((notification, i) => (
        <Notification
          key={i}
          message={notification.message}
          classList={`${notification.bgColor}`}
          onClose={() => removeNotification(notification.id)}
          duration={notification.duration}
        />
      ))}
    </div>
  );

  return {
    triggerNotification,
    NotificationComponent,
  };
};
