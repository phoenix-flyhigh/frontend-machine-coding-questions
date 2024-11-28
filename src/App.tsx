import React, { useRef, useState } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    modalTriggerRef.current?.focus();
  };

  const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
  
  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      <button ref={modalTriggerRef} onClick={() => setShowModal(true)}>
        Show modal
      </button>
      {showModal && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
