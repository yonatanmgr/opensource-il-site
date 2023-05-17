'use client';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  setShow: (arg0: boolean) => unknown;
  show: boolean;
  children: React.ReactNode;
};

export default function Modal({ setShow, show, children }: ModalProps) {
  const modalRoot = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (document) {
      modalRoot.current = document?.getElementById('modal-root');
    }
  }, []);

  if (!modalRoot.current || !show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div onClick={() => setShow(false)}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 outline-none backdrop-blur-sm focus:outline-none">
        <section
          id="info"
          className="no-scrollbar h-full w-full overflow-y-auto border border-white/10 bg-readmedark/80 p-8 shadow-4xl backdrop-blur-sm lg:h-2/3 lg:w-2/3 lg:rounded-2xl xl:h-3/5 xl:w-1/2"
        >
          <button
            type="button"
            onClick={() => setShow(false)}
            className="text-xl transition hover:font-bold"
          >
            x
          </button>
          {children}
        </section>
      </div>
    </div>,
    modalRoot.current
  );
}
