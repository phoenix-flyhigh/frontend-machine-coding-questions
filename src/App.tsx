import "./App.css";
import { useNotification } from "./useNotification";
import { NotificationType } from "./constants";

function App() {
  const { triggerNotification, NotificationComponent } =
    useNotification("bottom-center");

  return (
    <div className="h-screen w-full flex justify-center items-center relative">
      <div className="flex w-2/5 flex-wrap gap-12">
        <button
          className="bg-blue-500 btn"
          onClick={() => {
            triggerNotification({
              message: "This is an info message",
              type: NotificationType.INFO,
              duration: 3000,
            });
          }}
        >
          Show info
        </button>
        <button
          className="bg-green-500 btn"
          onClick={() => {
            triggerNotification({
              message: "This is an success message",
              type: NotificationType.SUCCESS,
              duration: 3000,
            });
          }}
        >
          Show Success
        </button>
        <button
          className="bg-orange-500 btn"
          onClick={() => {
            triggerNotification({
              message: "This is an warning message",
              type: NotificationType.WARNING,
              duration: 3000,
            });
          }}
        >
          Show Warning
        </button>
        <button
          className="bg-red-500 btn"
          onClick={() => {
            triggerNotification({
              message: "This is an error message",
              type: NotificationType.ERROR,
              duration: 3000,
            });
          }}
        >
          Show Error
        </button>
      </div>

      {NotificationComponent}
    </div>
  );
}

export default App;
