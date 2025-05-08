import { BlueButton } from "@components/common/button";
import { useCalendarStore } from "@components/common/context/RootStore";
import { FormButtonBasic } from "@components/mypage/form";
import styled from "@emotion/styled";
import { DateUtil } from "@utils/date.util";
import { axios } from "@utils/network.util";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo, useState } from "react";
import AlrmIcon from "./AlrmIcon";

const PopWrap = styled.div`
  z-index: 9;
  position: absolute;
  width: 360px;
  height: 624px;
  top: 40px;
  right: 40px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.27);
  border-radius: 10px;
  overflow: hidden;
  z-index: 9;
`;

const PopTopWrap = styled.div`
  position: relative;
  background-color: #454545;
  padding: 0 19px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
    line-height: 62px;
    + p {
      font-size: 15px;
      font-weight: 400;
    }
  }
`;

const PopMain = styled.div`
  height: calc(100% - 62px);
`;

const AlrmListWrap = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const AlrmButtonWrap = styled.div`
  margin-top: 10px;
  > button {
    width: 60px;
    height: 24px;
    border-radius: 2px;
    font-size: 12px;
    + button {
      margin-left: 7px;
    }
  }
`;

const AlrmItem = styled.li`
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
  display: flex;
  width: 100%;

  > article {
    width: calc(100% - 40px);
    padding: 0 30px 0 10px;
    box-sizing: border-box;

    > p {
      font-size: 16px;
      color: #454545;
      line-height: 1.25;
      > strong {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
      }
    }
    > span {
      display: block;
      margin-top: 5px;
      font-size: 13px;
      color: #999999;
    }
  }
`;

const NewIcon = styled.span`
  &:before {
    content: " ( NEW )";
    color: #f03e3e;
    font-weight: bold;
  }
`;

const NotificationPop = ({
  newAlrms = [],
  onSave = async () => {},
}: {
  newAlrms: Alrm[];
  onSave: () => Promise<void>;
}) => {
  const calendarStore = useCalendarStore();
  const [readAlrms, setReadAlrms] = useState<Alrm[]>([]);

  const initAlrms = useCallback(async () => {
    await axios.put("/alrm/read");
    const { data } = await axios.get<Alrm[]>("/alrm?isReadYn=Y");
    setReadAlrms(data);
  }, []);

  useEffect(() => {
    initAlrms();
  }, [newAlrms]);

  const onInviteButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const inviteYn = e.currentTarget.dataset.inviteYn;
      const { id } = e.currentTarget.parentElement.dataset as {
        id: string;
      };
      await axios.put("/diary/calendar/invite", { calendarId: id, inviteYn });
      await axios.delete(`/alrm/invite/${id}`);
      alert("처리되었습니다.");
      await onSave();
      await initAlrms();
      calendarStore.syncUserCalendar();
    },
    []
  );

  const AlrmList = useMemo(
    () =>
      readAlrms.map(({ title, note, sendDt, readDt, dataId, type }, idx) => (
        <AlrmItem key={`new-alrm-key-${idx}`}>
          <AlrmIcon type={type} />
          <article>
            <p
              dangerouslySetInnerHTML={{
                __html: `<strong>[ ${title} ] </strong>` + (note ?? ""),
              }}
            />
            <span>
              {DateUtil.formatLocale(new Date(sendDt))}
              {!readDt && <NewIcon />}
            </span>
            {type === "INVITE_CALENDAR" && dataId && (
              <AlrmButtonWrap data-id={dataId}>
                <BlueButton data-invite-yn={"Y"} onClick={onInviteButtonClick}>
                  수락
                </BlueButton>
                <FormButtonBasic
                  data-invite-yn={"N"}
                  onClick={onInviteButtonClick}
                >
                  거절
                </FormButtonBasic>
              </AlrmButtonWrap>
            )}
          </article>
        </AlrmItem>
      )),
    [readAlrms]
  );

  return (
    <PopWrap>
      <PopTopWrap>
        <p>알림</p>
        {newAlrms?.length > 0 && <p>새알림 {newAlrms.length}</p>}
      </PopTopWrap>
      <PopMain>
        <AlrmListWrap>
          <ul>{AlrmList}</ul>
        </AlrmListWrap>
      </PopMain>
    </PopWrap>
  );
};

export default observer(NotificationPop);
