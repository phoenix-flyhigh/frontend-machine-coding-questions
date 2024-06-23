import { ReactNode, useState } from "react";

interface Action {
  label: string;
  tooltip: string;
  onClick: () => void;
}
interface CardHeaderProps {
  heading: string;
  actions: Action[];
}
interface Pane {
  label: string;
  pane: ReactNode;
}
interface CardContentProps {
  tabs: {
    defaultActiveIndex: number;
    panes: Pane[];
  };
}

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-4/5 flex flex-col bg-gray-200 rounded-lg">{children}</div>
  );
};

const CardHeader = ({ heading, actions }: CardHeaderProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex justify-between px-6 py-3 border-b-2 border-gray-700">
      <h1 className="text-xl font-bold">{heading}</h1>
      <div className="flex gap-3 items-center">
        {actions.map((act) => (
          <div className="relative w-full">
            <button
              onClick={act.onClick}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-blue-600"
            >
              {act.label}
            </button>
            {showTooltip && act.tooltip && (
              <p className="bg-black text-white absolute p-2 text-sm no-wrap right-0">
                {act.tooltip}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CardContent = ({ tabs }: CardContentProps) => {
  const [activeIndex, setActiveIndex] = useState(tabs.defaultActiveIndex ?? 0);
  return (
    <div className="flex">
      <div className="flex flex-col border-r-2 border-gray-500">
        {tabs.panes.map((pane, i) => (
          <button
            key={pane.label}
            role="tab"
            aria-selected={activeIndex === i}
            onClick={() => setActiveIndex(i)}
            className={`px-6 py-4 hover:bg-blue-300 ${
              activeIndex === i ? "bg-blue-400 text-white" : ""
            }`}
          >
            {pane.label}
          </button>
        ))}
      </div>
      <div className="flex p-6">{tabs.panes[activeIndex].pane}</div>
    </div>
  );
};

Card.CardContent = CardContent;
Card.CardHeader = CardHeader;

export default Card;
