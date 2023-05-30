import React from 'react';
import ReactDOM from 'react-dom';

type Props = { show: boolean };

function LoadingSpinner({ show }: Props) {
  const modalRoot = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (document) {
      modalRoot.current = document?.getElementById('modal-root');
    }
  }, []);

  if (!modalRoot.current || !show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="absolute h-screen w-screen bg-black/50">
      <div className="center fixed left-[49%] top-[45%] h-10 w-10 animate-spin rounded-full border-8 border-mydarkblue border-t-myblue bg-transparent"></div>
    </div>,
    modalRoot.current
  );
}

export default LoadingSpinner;
