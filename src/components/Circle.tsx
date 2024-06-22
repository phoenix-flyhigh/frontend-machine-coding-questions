import { TCircle } from "./Board";

export const Circle = ({ x, y, id, bgColor }: TCircle) => {
  return (
    <div
      key={id}
      className={`absolute w-12 h-12 rounded-full -translate-x-full -translate-y-full`}
      style={{ backgroundColor: bgColor, top: `${y}px`, left: `${x}px` }}
    />
  );
};
