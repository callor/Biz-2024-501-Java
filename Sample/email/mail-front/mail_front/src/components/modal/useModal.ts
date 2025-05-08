import eventUtil, { EVENT } from "@/utils/event";
import { useAtom } from "jotai";
import { useEffect } from "react";
import type { ModalOptions } from ".";
import { modalOptionsAtom } from "./modal.atom";

const useModal = () => {
  // const [modalStack, setModalStack] = useState<ModalOptions[]>([]);
  const [modalStack, setModalStack] = useAtom(modalOptionsAtom);

  useEffect(() => {
    const onOpen = (options: ModalOptions) => {
      // document.querySelector("body").style.overflowY = "hidden";
      setModalStack((modalStack) => {
        const idx = modalStack.findIndex((modal) => modal.id === options.id);
        if (idx > -1) {
          return [...modalStack.slice(0, idx), options, ...modalStack.slice(idx + 1)];
        } else {
          return [...modalStack, options];
        }
      });
      options.onOpen?.();
    };
    const onClose = (id?: string) => {
      if (modalStack.length === 1) {
        // document.querySelector("body").style.overflowY = "";
      }
      setModalStack((modalStack) => {
        const modalIdx = id ? modalStack.findIndex((modal) => modal.id === id) : modalStack.length - 1;
        modalStack[modalIdx]?.onClose?.();
        return modalStack.filter((_, idx) => idx !== modalIdx);
      });
    };

    // @ts-ignore
    // prettier-ignore
    eventUtil.on(EVENT.OPEN_MODAL, onOpen).on(EVENT.CLOSE_MODAL, onClose);

    return () => {
      // @ts-ignore
      // prettier-ignore
      eventUtil.off(EVENT.OPEN_MODAL, onOpen).off(EVENT.CLOSE_MODAL, onClose);
    };
  }, [modalStack.length, setModalStack]);

  return modalStack;
};

export default useModal;
