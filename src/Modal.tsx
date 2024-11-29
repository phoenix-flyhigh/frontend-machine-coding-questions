import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const [showMore, setShowMore] = useState(false);

  const seeMore = () => setShowMore(true);
  const seeLess = () => setShowMore(false);

  const nodeRef: React.RefObject<HTMLDialogElement> = useOutsideClick(onClose)

  const firstFocussableRef = useRef<HTMLElement | null>(null);
  const lastFocussableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focussables = Array.from<HTMLElement>(
      nodeRef.current?.querySelectorAll("button, [href]") ?? []
    );

    firstFocussableRef.current = focussables[0];
    lastFocussableRef.current = focussables[focussables.length - 1];

    firstFocussableRef.current.focus();
  }, [showMore, nodeRef]);

  const handleKeydown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (
      e.key === "Tab" &&
      !e.shiftKey &&
      e.target === lastFocussableRef.current
    ) {
      e.preventDefault();
      firstFocussableRef.current?.focus();
    }
    if (
      e.key === "Tab" &&
      e.shiftKey &&
      e.target === firstFocussableRef.current
    ) {
      e.preventDefault();
      lastFocussableRef.current?.focus();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed flex justify-center items-center w-full h-full bg-black bg-opacity-50">
      <dialog
        ref={nodeRef}
        onKeyDown={handleKeydown}
        className="bg-white w-1/3 p-6 rounded-lg flex flex-col gap-8 z-10"
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Modal title</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <p>Modal content</p>
        {!showMore && (
          <button onClick={seeMore} className="self-start">
            See more
          </button>
        )}
        {showMore && (
          <div className="flex flex-col items-start">
            <p>Show more content</p>
            <button onClick={seeLess}>See less</button>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default Modal;
