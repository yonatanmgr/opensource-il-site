type ModalProps = {
  setShow: (arg0: boolean) => unknown;
  show: boolean;
  children: React.ReactNode;
};

export default function Modal({ setShow, show, children }: ModalProps) {
  return (
    <div onClick={() => setShow(false)}>
      <div
        className={`${
          show ? 'block' : 'hidden'
        } fixed z-10 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm`}
      >
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
    </div>
  );
}
