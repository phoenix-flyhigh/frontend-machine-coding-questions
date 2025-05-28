import { useState } from "react";
import { NotificationType } from "./constants";
import NotificationWrapper from "./NotificationWrapper";

interface triggerNotificationProps {
  message: string;
  type: NotificationType;
  durationInSeconds: number;
}

export type TNotification = {
  id: number;
  message: string;
  bgColor: string;
  duration: number;
};

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

  const triggerNotification = ({
    message,
    type,
    durationInSeconds,
  }: triggerNotificationProps) => {
    const duration = durationInSeconds * 1000;
    const id = Date.now() * Math.random();

    setNotifications((prev) => {
      const newNotification = {
        id,
        message,
        bgColor: colorToNotificationType[type],
        duration,
      };

      if (bottomPositions.includes(position)) return [newNotification, ...prev];
      else return [...prev, newNotification];
    });
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((x) => x.id !== id));
  };

  return {
    triggerNotification,
    NotificationComponent: (
      <NotificationWrapper
        position={position}
        notifications={notifications}
        onClose={(id) => removeNotification(id)}
      />
    ),
  };
};
