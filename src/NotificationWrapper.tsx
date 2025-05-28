import type { TNotification } from "./useNotification";
import { Notification } from "./Notification";

const NotificationWrapper = ({
  position,
  notifications,
  onClose,
}: {
  position: string;
  notifications: TNotification[];
  onClose: (id: number) => void;
}) => (
  <div
    className={`${position} flex flex-col items-center gap-4 absolute m-6 w-1/4`}
  >
    {notifications.map((notification) => (
      <Notification
        key={notification.id}
        message={notification.message}
        classList={notification.bgColor}
        onClose={() => onClose(notification.id)}
        duration={notification.duration}
      />
    ))}
  </div>
);


export default NotificationWrapper
