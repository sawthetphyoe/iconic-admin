"use client";

import React from "react";
import mergeClassNames from "@/utils/mergeClassnames";

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  title?: string;
  closeIcon?: boolean;
  openButton: React.ReactNode;
  actionOnClose?: Function;
  children: React.ReactNode;
  width?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  title,
  id,
  closeIcon = false,
  openButton,
  actionOnClose = () => {},
  children,
  width,
}) => {
  return (
    <>
      <div onClick={() => setOpen(true)}>{openButton}</div>
      <dialog
        id={id}
        className={mergeClassNames("modal", open && "modal-open")}
      >
        <div className={mergeClassNames("modal-box w-full", width)}>
          <div className={"flex justify-between items-center mb-6"}>
            {title && <h3 className="font-bold text-lg">{title}</h3>}
            {closeIcon && (
              <form method="dialog" onSubmit={() => actionOnClose()}>
                <button
                  className="btn btn-sm btn-circle absolute right-2 top-2 btn-ghost"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </form>
            )}
          </div>
          {children}
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onSubmit={() => actionOnClose()}
          onClick={() => setOpen(false)}
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
