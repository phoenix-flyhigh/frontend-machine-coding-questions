import { ReactNode } from "react";

type ActionProps =
  | {
      type: ReactNode;
      buttonType: "submit" | "reset";
    }
  | {
      type: ReactNode;
      handleClick: () => void;
    };

const Action = ({ type, ...rest }: ActionProps) => {
  return (
    <button
      onClick={"handleClick" in rest ? rest.handleClick : undefined}
      type={"buttonType" in rest ? rest.buttonType : "button"}
    >
      {type}
    </button>
  );
};

export default Action;
