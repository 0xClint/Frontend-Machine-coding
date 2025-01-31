import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import "./CustomModal.css";

export const CustomModal = ({ isOpen, setIsOpen }) => {
  const [newModal, setNewModal] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    setNewModal(document.getElementById("portal"));
  }, []);

  const handleContainerClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  if (!newModal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="custom-modal-container" onClick={handleContainerClick}>
          <div className="custom-modal" ref={popupRef}>
            <span className="modal-cancel" onClick={() => setIsOpen(false)}>
              X
            </span>
            Hello
          </div>
        </div>
      )}
    </>,
    newModal
  );
};
