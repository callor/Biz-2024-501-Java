import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children, elementId }: { children: React.ReactNode; elementId: string }) => {
  const element = useMemo(() => {
    const modalRoot = document.getElementById('modal-root');
    const el = document.createElement('div');
    el.id = elementId;
    modalRoot.appendChild(el);
    return el;
  }, [elementId]);

  useEffect(() => {
    return () => {
      const dom = document.getElementById(elementId);
      dom?.remove();
    };
  }, []);

  return createPortal(children, element);
};

export default ModalPortal;
