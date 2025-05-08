import { useCallback, useEffect } from "react";

/**
 * Popover onClose에 Scroll 제어 이벤트 추가(body 스크롤 시 popover 사라짐)
 * @param open        popover 오픈 true, false
 * @param onClose     popover onClose 이벤트
 * @param id          popover id - 스크롤 있을 때만 줘도 됨
 */
export const usePopoverScroll = (
  open: boolean,
  onClose?: () => void,
  id?: string,
  option?: AddEventListenerOptions,
) => {
  const handleClose = useCallback(() => {
    // TODO 나중에 close 되고나서 removeEvent 주는 시점 생각해보기 > 현재는 unmount 기준 remove

    let scrollCheck = false;
    document.querySelectorAll(":hover").forEach((val) => {
      if (Array.from(val.classList).includes(`Mui-${id}`)) {
        // scroll 있는 것만 마우스 popover 위에 있을 때 안닫히게 => popover에 `Mui-${id}` className 필요
        const scrollExist = val.scrollHeight > val.clientHeight;
        if (scrollExist) {
          scrollCheck = true;
        }
      }
    });

    // scroll 이벤트 아닐 때 호출되거나 scroll popover 아닌경우 닫힘
    if (!scrollCheck) {
      onClose?.();
    }
  }, [id, onClose]);

  useEffect(() => {
    // add, remove >> 뒤에 boolean은 window 개체에서 true 여야 작동(문제없으면 나중에 false 처리해도 됨)
    if (open) {
      document.body.addEventListener("wheel", handleClose, option ? { ...option } : { once: true });
      document.body.addEventListener("touchstart", handleClose, option ? { ...option } : { once: true }); // 모바일
    }
  }, [handleClose, open, option]);

  return;
};
