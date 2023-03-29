type ModalProps = {
    setShow: (arg0: boolean) => unknown;
    show: boolean;
    children: React.ReactNode;
}

export default function Modal ({ setShow, show, children }: ModalProps) {
  return (
    <div className={`${show ? "block" : "hidden"} w-screen h-screen fixed flex justify-center items-center z-10 bg-black/50 backdrop-blur-sm`}>
      <section id="info" className="p-8 bg-readmedark/80 backdrop-blur-sm lg:w-2/3 lg:h-2/3 xl:w-1/2 xl:h-3/5 w-full h-full overflow-y-auto no-scrollbar shadow-4xl lg:rounded-2xl border border-white/10">
        <button type="button" onClick={()=>setShow(false)} className="text-xl hover:font-bold transition">x</button>
        {children}
      </section>
    </div>
  );
};