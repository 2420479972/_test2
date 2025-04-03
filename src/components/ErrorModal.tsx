import { useEffect } from "react";
import close from "/close.png";
import { useError } from "../hooks/useError";

const Modal = () => {
  const { error, hideError } = useError();
  const isOpen = !!error;

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
      <div className="relative bg-[#101C2B] w-full break-all whitespace-pre-line leading-normal px-[1em] py-[1.5em] after:content-[''] after:absolute after:z-0 after:inset-0 after:rounded-[0.5em] after:p-[0.0625em] after:bg-[linear-gradient(0deg,#B938C9,#51B3DC)] after:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] after:![mask-composite:exclude] after:pointer-events-none">
        {error}
      </div>

      <img
        src={close}
        alt="Close"
        className="size-[2.25em] mt-[1.125em] cursor-pointer"
        onClick={hideError}
      />
    </div>
  );
};

export default Modal;
