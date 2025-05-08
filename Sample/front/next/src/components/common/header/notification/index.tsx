import NotificationPop from "@components/notification";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useToggle from "@hooks/useToggle";
import theme from "@styles/theme";
import { axiosFetcher } from "@utils/network.util";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import HeaderButton from "../button";

const onCss = css`
  &:after {
    position: absolute;
    top: 8px;
    right: 8px;
    content: "";
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #d44040;
  }
`;

const NotificationClose = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 8;
`;

const Alrm = styled(HeaderButton)<{ isOn: boolean }>`
  ${(props) => props.isOn && onCss}
`;

const Notification = () => {
  const router = useRouter();
  const { data: newAlrms, error, mutate } = useSWR<Alrm[]>(
    "/alrm?isReadYn=N",
    axiosFetcher
  );
  const [isAlrmContainer, toggleAlrmContainer] = useToggle(false);

  const onClick = useCallback(() => {
    mutate([]);
    toggleAlrmContainer();
  }, [toggleAlrmContainer]);

  const onSave = useCallback(async () => {
    await mutate();
  }, [mutate]);

  useEffect(() => {
    if (newAlrms?.length > 0) {
      toast(`확인하지 않은 알림 ${newAlrms.length}건이 존재 합니다.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick,
      });
    }
  }, [newAlrms]);

  useEffect(() => {
    if (error) {
      if (error.status) {
        if (error.response?.status === 403) {
          router.reload();
        } else {
          alert(error);
        }
      }
    }
  }, [error]);

  return (
    <>
      <Alrm
        base={theme.icons.alrmOff}
        on={theme.icons.alrmOn}
        alt="알림"
        isActive={isAlrmContainer}
        onClick={onClick}
        isOn={newAlrms?.length > 0}
      />
      {isAlrmContainer && (
        <>
          <NotificationPop newAlrms={newAlrms} onSave={onSave} />
          <NotificationClose onClick={toggleAlrmContainer} />
        </>
      )}
    </>
  );
};

export default Notification;
