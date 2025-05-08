import { Close } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@/styles/theme";
import { dateUtil } from "@/utils/date";
import eventUtil, { EVENT } from "@/utils/event";
import React, { useCallback, useEffect } from "react";
import Draggable from "react-draggable";
import { ModalOptions, modal } from ".";

const CloseButton = styled(Close)`
  cursor: pointer;
  font-size: 24px;
`;
const Background = styled("div")`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalWrap = styled("article")<{ type: "default" | "white" | "alert" }>`
  background-color: ${({ theme, type }) => theme.white};
  overflow: hidden;
  position: fixed;
  width: ${({ theme, type }) => (type === "white" ? "90%" : "auto")};
  min-width: ${({ theme, type }) => (type === "white" ? "800px" : "auto")};
  max-width: 1200px;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    padding: 10px 10px 8px;
    font-size: 14px;
    color: ${theme.white};
    background-color: ${({ theme, type }) => theme.main};
    > span + span {
      margin-left: 10px;
    }
  }
  > article {
    padding: 10px;
    border: 3px solid ${({ theme, type }) => theme.white};
    background-color: ${theme.white};
  }
  > article.mainbox {
    padding: 60px 10px 10px;
  }
  > article.alertbox {
    padding: 48px 10px 10px;
  }
`;

const ModalReturnMSg = styled("div")({
  position: "relative",
  marginBottom: "15px",
  "> textarea": {
    width: "100%",
    padding: "3px 6px",
    fontSize: "12px",
    maxHeight: "300px",
    resize: "none",
  },
  "> p": {
    position: "absolute",
    bottom: "8px",
    right: "5px",
    padding: "0 3px 2px",
    fontSize: "10px",
    backgroundColor: theme.grey.default,
    border: theme.border,
    borderRadius: "10px",
    opacity: 0.8,
    cursor: "pointer",
  },
});

const Modal: React.FC<ModalOptions> = ({
  render: Component, // 렌더링될 내용
  title, // 제목
  props = {}, // 모달로 전달될 props
  id, // 모달 고유id
  type = "default", // default | white | alert : default: 기본, white: 전체 흰색모달(닫기버튼추가필요), alert: 경고모달
  draggable = false, // 모달 drag 가능한지? ( type==='white'에서 사용할 경우 id값을 부여해줄 엘리먼트 추가 필요)
  backgroundClosable = false, // 모달 외 공간 클릭시 모달창 닫힘 옵션
  alertConfirmFunc, // type==='alert'일때 확인버튼 메서드 설정 ( alertConfirmFunc가 있을 시 '확인' 버튼이 추가됨.)
  alertConfirmText,
  alertCancleFunc,
  alertCancelText, // type==='alert' 일때 '닫기' 버튼 텍스트 오버라이드
  onClickXButton,
  showReturnMsg, // 요청 F 메세지
  autoCloseTimer, // 입력한 초 뒤에 모달 자동 닫힘
}) => {
  const onClose = useCallback(() => {
    eventUtil.emit(EVENT.CLOSE_MODAL, id);
  }, [id]);

  const nodeRef = React.useRef(null);

  const onBackgroundClick = useCallback(() => {
    if (backgroundClosable) {
      onClose();
    }
  }, [backgroundClosable, onClose]);

  const onAlertConfirmFunc = useCallback(async () => {
    if (alertConfirmFunc) {
      await alertConfirmFunc();
      onClose();
    }
  }, [alertConfirmFunc, onClose]);

  const stopableClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (backgroundClosable) {
        e.stopPropagation();
      }
    },
    [backgroundClosable],
  );

  useEffect(() => {
    if (autoCloseTimer) {
      const autoClose = setTimeout(() => onClose(), autoCloseTimer);
      return () => {
        clearTimeout(autoClose);
      };
    }
  }, [autoCloseTimer, onClose]);

  return (
    <Background onClick={onBackgroundClick}>
      {/* 테마 추가 */}
      <Draggable disabled={!draggable} handle="#modal-header" nodeRef={nodeRef}>
        <ModalWrap
          type={type}
          style={type === "alert" ? { minWidth: "300px" } : {}}
          onClick={stopableClick}
          ref={nodeRef}
        >
          {type === "default" && (
            <>
              <header id="modal-header" style={{ cursor: `${draggable ? "grab" : "auto"}` }}>
                <Typography fontSize={15}>{title}</Typography>
                <CloseButton
                  sx={{ color: theme.white }}
                  fontSize="small"
                  onClick={() => {
                    if (!onClickXButton?.()) {
                      // undefined이거나 false이면 close / true일때는 close X
                      onClose();
                    }
                  }}
                />
              </header>
              <article className="mainbox">
                <Component {...props} id={id} />
              </article>
            </>
          )}
          {type === "white" && (
            <>
              <article>
                <Component {...props} id={id} />
              </article>
            </>
          )}
          {type === "alert" && (
            <>
              <header id="modal-header" style={{ cursor: `${draggable ? "grab" : "auto"}` }}>
                <Typography fontSize={15}>{title ?? "알림"}</Typography>
                <CloseButton
                  sx={{ color: theme.white }}
                  fontSize="small"
                  onClick={() => {
                    if (!onClickXButton?.()) {
                      // undefined이거나 false이면 close / true일때는 close X
                      onClose();
                    }
                  }}
                />
              </header>
              <article className="alertbox">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "16px 13px 20px",
                  }}
                >
                  <Component {...props} id={id} />
                </div>
                {showReturnMsg && (
                  <ModalReturnMSg>
                    <textarea
                      value={`[${dateUtil.dateFormat(
                        new Date(),
                        "yyyy-MM-dd HH:mm",
                      )}]\n${showReturnMsg}`}
                      readOnly
                    />
                    <p
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `[${dateUtil.dateFormat(new Date(), "yyyy-MM-dd HH:mm")}]\n${showReturnMsg}`,
                        )
                      }
                    >
                      copy
                    </p>
                  </ModalReturnMSg>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "13px",
                  }}
                >
                  {alertConfirmFunc && (
                    <Button
                      sx={{ mr: 1, minWidth: "74px" }}
                      onClick={onAlertConfirmFunc}
                      variant="contained"
                      className="light"
                    >
                      {alertConfirmText ?? "확인"}
                    </Button>
                  )}
                  <Button
                    variant={`${alertConfirmFunc ? "outlined" : "contained"}`}
                    className={`${alertConfirmFunc ? "" : "light"}`}
                    style={{ minWidth: "74px" }}
                    onClick={() => {
                      alertCancleFunc && alertCancleFunc();
                      modal.close(id);
                    }}
                  >
                    {alertCancelText ?? "닫기"}
                  </Button>
                </div>
              </article>
            </>
          )}
        </ModalWrap>
      </Draggable>
    </Background>
  );
};

export default Modal;
