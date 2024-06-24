import React, { ReactElement, useEffect } from "react";
import { ReactNode, createContext, useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface IAccordionContext {
  activeAccordionId: number;
  handleClick: (id: number) => void;
  moveToNextAccordion: (currentId: number) => void;
}

const AccordionContext = createContext<IAccordionContext>({
  activeAccordionId: 0,
  handleClick: () => {},
  moveToNextAccordion: () => {},
});

const Accordion = ({
  defaultActive,
  children,
}: {
  defaultActive: number;
  children: ReactNode[];
}) => {
  const [activeAccordionId, setActiveAccordionId] = useState(defaultActive);

  const handleClick = (id: number) => setActiveAccordionId(id);
  const moveToNextAccordion = (currentId: number) => {
    if (currentId === children.length) {
      setActiveAccordionId(1);
    } else {
      setActiveAccordionId((prev) => prev + 1);
    }
  };

  const contextValue = { activeAccordionId, handleClick, moveToNextAccordion };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className="flex flex-col w-3/5 bg-gray-900 p-6">{children}</div>
    </AccordionContext.Provider>
  );
};

const Item = ({ id, children }: { id: number; children: ReactElement[] }) => {
  const { activeAccordionId, moveToNextAccordion } =
    useContext(AccordionContext);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (activeAccordionId === id) {
      timer = setTimeout(() => {
        moveToNextAccordion(id);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [id, activeAccordionId]);

  return (
    <div
      className={`flex flex-col gap-4 w-full border-b-2 border-slate-400 ${
        Number(activeAccordionId) - 1 === Number(id) ? "border-none" : ""
      }`}
    >
      {children.map((child) => React.cloneElement(child, { id: id }))}
    </div>
  );
};

const Toggle = ({ children, id }: { children: ReactNode; id?: number }) => {
  const { activeAccordionId, handleClick } = useContext(AccordionContext);
  if (id === undefined) return;
  const isActiveAccordion = id === activeAccordionId;

  return (
    <div className="flex flex-col w-full">
      {isActiveAccordion && (
        <div className="relative w-full h-1 bg-gray-300 rounded-md overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full bg-indigo-500 -translate-x-full"
            style={{ animation: "slideIn 3s forwards" }}
          />
        </div>
      )}
      <button
        aria-expanded={isActiveAccordion}
        onClick={() => handleClick(id)}
        className="flex justify-between items-center p-3 font-bold text-lg"
      >
        {children}
        <FaChevronDown />
      </button>
    </div>
  );
};

const Panel = ({ children, id }: { children: ReactNode; id?: number }) => {
  const { activeAccordionId } = useContext(AccordionContext);
  if (id === undefined) return;

  return (
    id === activeAccordionId && <div className="panel p-3">{children}</div>
  );
};

Accordion.Item = Item;
Accordion.Toggle = Toggle;
Accordion.Panel = Panel;

export default Accordion;
