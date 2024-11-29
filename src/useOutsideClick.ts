import { useRef, useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  onOutsideClick: () => void
) => {
  const nodeRef = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onOutsideClick]);

  return nodeRef;
};
