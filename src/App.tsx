import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";

interface TasksAndSubtasksProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

interface updatedTask {
  title: string;
  subtasks: SUBTASK[];
}

type SUBTASK = { title: string; completed: boolean };

const TasksAndSubtasks = ({ tasks, setTasks }: TasksAndSubtasksProps) => {
  const mappedTasks = tasks.map((t) => ({
    title: t.title,
    subtasks: t.subtasks.map((s) => ({
      title: s,
      completed: false,
    })),
  }));

  const [updatedTasks, setUpdatedTasks] = useState<updatedTask[]>(mappedTasks);

  const completeSubtask = (task: updatedTask, subTask: SUBTASK) => {
    setUpdatedTasks((prev) =>
      prev.map((updatedTask) =>
        updatedTask.title === task.title
          ? {
              ...updatedTask,
              subtasks: updatedTask.subtasks.map((sub) =>
                sub.title === subTask.title ? { ...sub, completed: true } : sub
              ),
            }
          : updatedTask
      )
    );
  };

  const isTaskComplete: (task: updatedTask) => boolean = (
    task: updatedTask
  ) => {
    return task.subtasks.find((s) => s.completed === false) ? false : true;
  };

  const clearTasks = () => {
    setTasks((prev) =>
      prev.filter(
        (task) =>
          !isTaskComplete(
            updatedTasks.find(
              (updatedTask) => updatedTask.title === task.title
            ) as updatedTask
          )
      )
    );

    setUpdatedTasks((prev) => prev.filter((u) => !isTaskComplete(u)));
  };

  return (
    <div className="flex flex-col gap-6 text-lg">
      <button
        className="px-4 py-2 bg-gray-200 border border-black rounded-md"
        onClick={clearTasks}
      >
        Clear completed Tasks
      </button>
      {updatedTasks.map((task) => (
        <div className="flex flex-col gap-6" key={task.title}>
          <p className={`${isTaskComplete(task) ? "line-through" : ""}`}>
            {task.title}
          </p>
          <div className="flex flex-col items-start pl-4 gap-6">
            {task.subtasks.map((s) => (
              <button
                key={s.title}
                className={`${s.completed ? "line-through" : ""}`}
                onClick={() => {
                  completeSubtask(task, s);
                }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type Task = {
  title: string;
  subtasks: string[];
};

const TASKS: Task[] = [
  {
    title: "Clean bedroom",
    subtasks: ["Do laundry", "Organize desk", "Wipe floors"],
  },
  {
    title: "Study",
    subtasks: ["Review chemistry", "Do a React coding challenge"],
  },
  {
    title: "Build website",
    subtasks: ["Choose tech stack", "Design pages", "Develop", "Publish"],
  },
];

function App() {
  const [tasks, setTasks] = useState(TASKS);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <TasksAndSubtasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
