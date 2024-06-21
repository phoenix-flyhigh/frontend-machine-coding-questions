import { useMemo, useState } from "react";
import CHART_DATA from "./chartData";
import "./App.css";
import { motion } from "framer-motion";

function App() {
  const [showChart, setShowChart] = useState(false);

  const maxTickets = useMemo(
    () => Math.max(...CHART_DATA.map((x) => x.ticketCount)),
    []
  );

  return (
    <div className="h-screen w-full flex flex-col gap-12 justify-start items-center p-8">
      <button
        className="bg-black text-white px-4 py-3 active:scale-90"
        onClick={() => setShowChart((prev) => !prev)}
      >
        Toggle chart
      </button>
      {showChart && (
        <div className="relative w-max h-1/3 border-black border-2 border-r-0 border-t-0 flex flex-row gap-10 items-end">
          <p className="absolute text-md font-semibold top-1/2 -rotate-90 left-0 -translate-x-2/3">
            Number of tickets
          </p>
          <p className="absolute text-md font-semibold bottom-0 -translate-x-1/2 left-1/2 translate-y-full">
            Departments
          </p>
          {CHART_DATA.map(({ id, name, ticketCount, colour }) => (
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: `${Math.ceil((ticketCount / maxTickets) * 100)}%`,
              }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5 }}
              key={id}
              className="bar"
              style={{
                backgroundColor: colour,
              }}
            >
              <div className="tooltip">
                {name}-{ticketCount}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
