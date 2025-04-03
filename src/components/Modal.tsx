import { ReactNode, useEffect } from "react";
import close from "/close.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center flex-col px-[2em] z-[40]">
      <div className="relative bg-[#101C2B] w-full after:content-[''] after:absolute after:z-0 after:inset-0 after:rounded-[0.5em] after:p-[0.0625em] after:bg-[linear-gradient(0deg,#B938C9,#51B3DC)] after:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] after:![mask-composite:exclude] after:pointer-events-none">
        {children}
      </div>

      <img
        src={close}
        alt="Close"
        className="size-[2.25em] mt-[1.125em] cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

export default Modal;
