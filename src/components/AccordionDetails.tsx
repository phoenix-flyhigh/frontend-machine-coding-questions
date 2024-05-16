import { ReactNode, HTMLAttributes } from "react";

const AccordionDetails = ({
  id,
  children,
  ...props
}: {
  id?: string;
  children: ReactNode;
  props?: HTMLAttributes<HTMLElement>;
}) => {
  return (
    <div
      id={id}
      {...props}
      className="bg-white text-black h-28 overflow-scroll rounded-b-lg p-4"
    >
      {children}
    </div>
  );
};

export default AccordionDetails;
