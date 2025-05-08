import { styled } from "@mui/material/styles";
import Modal from "./Modal";
import useModal from "./useModal";

const ModalWrap = styled("div")`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const ModalContainer = () => {
  const modals = useModal();
  if (modals.length === 0) {
    return null;
  }
  return (
    <ModalWrap>
      {modals.map((modal) => (
        <Modal {...modal} key={modal.id} />
      ))}
    </ModalWrap>
  );
};

export default ModalContainer;
