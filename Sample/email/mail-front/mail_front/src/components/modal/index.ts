import eventUtil, { EVENT } from "@/utils/event";
import ModalContainer from "./ModalContainer";

export type ModalPage<T = Record<string, any>> = (args: T & { id: string }) => JSX.Element;

export type ModalOptions = {
  id: string;
  title?: string;
  render: (T: any) => JSX.Element;
  props?: {
    [key: string]: unknown;
  };
  type?: "default" | "white" | "alert";
  backgroundClosable?: boolean;
  draggable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  alertConfirmFunc?: () => void;
  alertConfirmText?: string;
  alertCancleFunc?: () => void;
  alertCancelText?: string;
  showReturnMsg?: string;
  autoCloseTimer?: number;
  onClickXButton?: () => boolean;
};
/**
 * modal open시 type='white'일경우 close 버튼을 직접 만들어주어야함.
 */
export const modal = {
  open(options: ModalOptions) {
    eventUtil.emit(EVENT.OPEN_MODAL, options);
  },
  close(id?: string) {
    return eventUtil.emit(EVENT.CLOSE_MODAL, id);
  },
};

export default ModalContainer;
