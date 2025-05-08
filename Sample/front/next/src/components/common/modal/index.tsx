import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

const ModalPortal = dynamic(() => import('./portal'), { ssr: false });

const ModalWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }
`;
const Modal = ({
  elementId,
  children,
  className,
  isShow,
  onBackgroundClick = () => {},
}: {
  elementId: string;
  children: React.ReactNode;
  onBackgroundClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  isShow: boolean;
}) => {
  return (
    isShow && (
      <ModalPortal elementId={elementId}>
        <ModalWrap onClick={onBackgroundClick}>
          <div className={className} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </ModalWrap>
      </ModalPortal>
    )
  );
};

export default Modal;
