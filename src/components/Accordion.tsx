import React, { ReactElement, useState } from "react";

const Accordion = ({
  isExpanded,
  children,
}: {
  isExpanded?: boolean;
  children: ReactElement[];
}) => {
  const panelId = children[0]?.props["aria-controls"];
  const accordionId = children[0]?.props["id"];
  const [expanded, setExpanded] = useState(isExpanded || false);

  return (
    <div className="w-full">
      {React.cloneElement(children[0], {
        onClick: () => setExpanded((prev) => !prev),
        isExpanded: expanded,
        "aria-selected": expanded,
      })}
      {expanded &&
        React.cloneElement(children[1], {
          id: panelId,
          "aria-labelledby": accordionId,
          tabIndex: 0,
        })}
    </div>
  );
};

export default Accordion;
