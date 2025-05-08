import styled from "@emotion/styled";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const PopupFull = styled.div<{ isShow: boolean }>`
  z-index: 9;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  ${(props) => !props.isShow && "display: none;"}
`;

const PopupWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 540px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
`;

const PopupTop = styled.div`
  position: relative;
  background-color: #454545;
  padding: 0 19px;
  box-sizing: border-box;

  > p {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    line-height: 62px;
  }
  > button {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: url("/images/btn/btn_close_white_16x16.png") center no-repeat;
  }
`;

type MyPagePopupProps = {
  show?: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
};
const PopupContext = createContext(() => {});
const MyPagePopup = ({
  show = false,
  title,
  children,
  onClose,
}: MyPagePopupProps) => {
  const [isShow, setShow] = useState(show);

  const close = useCallback(() => {
    setShow(false);

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    setShow(show);
  }, [show]);
  return (
    <PopupFull isShow={isShow}>
      <PopupWrap>
        <PopupTop>
          <p>{title}</p>
          <button onClick={close} />
        </PopupTop>
        {children}
      </PopupWrap>
    </PopupFull>
  );
};

export const usePopupClose = () => useContext(PopupContext);
export default MyPagePopup;
