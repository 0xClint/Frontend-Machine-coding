import ReactDOM from "react-dom";
import "./CustomModal.css";
import { useEffect, useState } from "react";

interface CustomMoalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomModal({ isOpen, setOpen }: CustomMoalProps) {
  const [customModal, setCustomModal] = useState<any>(null);

  useEffect(() => {
    setCustomModal(document.getElementById("portal"));
  }, []);

  if (!customModal) return;

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div className="custom-modal flex-center">
          <div className="modal-container">
            <span className="cancel-btn" onClick={() => setOpen(false)}>
              ❌
            </span>
            <div>Modal Container </div>
          </div>
        </div>
      )}
    </>,
    customModal
  );
}
