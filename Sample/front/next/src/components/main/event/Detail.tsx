import { BlueButton } from '@components/common/button';
import ButtonWrap from '@components/common/button/ButtonWrap';
import { useCalendarStore, useRootStore } from '@components/common/context/RootStore';
import Modal from '@components/common/modal';
import { FormButtonBasic } from '@components/mypage/form';
import config from '@config';
import styled from '@emotion/styled';
import { IconButton, Tooltip } from '@material-ui/core';
import { TODO_BG_COLOR } from '@utils/contants';
import { DateUtil } from '@utils/date.util';
import { FileUtil } from '@utils/file.util';
import { axios, getThumbnail } from '@utils/network.util';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

//#region styled
const CheckBoxWrap = styled.div`
  display: inline-block;
  input[type='checkbox'] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding-left: 34px;
      background: url('/images/btn/btn_checkbox_no_24x24.png') left center no-repeat;
    }
    &:checked + label {
      background: url('/images/btn/btn_checkbox_yes_24x24.png') left center no-repeat;
    }
  }
  input[type='radio'] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.grey};
      padding-left: 34px;
      line-height: 24px;
      background: url('/images/btn/btn_radio_off.png') left center no-repeat;
      cursor: pointer;
    }
    &:checked + label {
      background: url('/images/btn/btn_radio_on.png') left center no-repeat;
    }
  }
`;
const ApplyPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    padding: 40px 40px 30px;
    box-sizing: border-box;
    text-align: center;

    > p {
      font-size: 18px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black};
      + p {
        display: block;
        font-size: 14px;
        color: #454545;
        margin: 16px 0 12px;
      }
    }

    > ${CheckBoxWrap} {
      width: 100%;
      padding: 20px 22px;
      border: 1px solid ${({ theme }) => theme.colors.borderLight};
      text-align: left;
      box-sizing: border-box;
      > div + div {
        margin-top: 10px;
      }
    }
    ${ButtonWrap} {
      margin-top: 20px;
      button {
        width: 135px;
        height: 40px;
        border-radius: 5px;
        &:last-of-type {
          margin-left: 15px;
        }
      }
    }
  }
`;

const Color = styled.i<{ color: string }>`
  width: 18px;
  border-radius: 50%;
  height: 18px;
  background-color: ${(props) => props.color};
`;
const ProfileImage = styled.small<{ profile: string }>`
  background-image: url(${(props) => getThumbnail(props.profile)});
  background-size: auto 40px;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
const DetailModal = styled(Modal)`
  width: 550px;
  max-height: 600px;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  div[id^='detail'] {
    display: none;
  }
  input[type='radio'] {
    display: none;
    &#detail-main:checked {
      ~ nav .detail-main {
        :after {
          transform: scaleX(1);
        }
        label {
          color: #339af0;
        }
      }
      ~ article > #detail-main-article {
        display: block;
      }
    }
    &#detail-files:checked {
      ~ nav .detail-files {
        :after {
          transform: scaleX(1);
        }
        label {
          color: #339af0;
        }
      }
      ~ article > #detail-files-article {
        display: flex;
      }
    }
    &#detail-replys:checked {
      ~ nav .detail-replys {
        :after {
          transform: scaleX(1);
        }
        label {
          color: #339af0;
        }
      }
      ~ article > #detail-replys-article {
        display: block;
      }
    }
  }
  > header {
    display: flex;
    align-items: center;
    margin-top: 18px;
    padding: 0 30px;
    height: 48px;
    h2 {
      margin-top: -3px;
      margin-left: 10px;
      margin-right: auto;
      font-size: 18px;
      font-weight: 500;
      > del {
        color: #adb5bd;
      }
    }
    > button:last-of-type {
      margin-right: -12px;
    }
  }
  > nav {
    padding: 0 30px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    > ul {
      display: flex;
      align-items: center;
      height: 40px;
      li {
        height: 100%;
        font-size: 13px;
        color: #868e96;
        width: 70px;
        position: relative;
        > label {
          justify-content: center;
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
          cursor: pointer;
        }
        &:after {
          text-align: center;
          content: ' ';
          height: 2px;
          border-radius: 4px 4px 0 0;
          width: 70px;
          transform: scaleX(0);
          position: absolute;
          bottom: -1px;
          left: 0;
          background-color: #339af0;
          transition: 0.25s ease-in-out;
        }
      }
    }
  }
  > article {
    position: relative;
    flex: 1;
    padding: 20px 35px;
    padding-top: 10px;
    padding-bottom: 30px;
    overflow-y: hidden;
  }
  > footer {
    height: 45px;
    line-height: 45px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
    text-align: right;
  }
`;

const DetailMain = styled.div`
  height: 100%;
  > article {
    height: 100%;
  }
  > article ul {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  > article ul li {
    display: flex;
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
      overflow-y: hidden;
    }

    div + div {
      margin-left: 25px;
    }
    div {
      display: flex;
      width: 100%;
      flex-direction: column;
      span {
        font-weight: 500;
        margin-left: 10px;
      }

      p {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 15px;
        :first-of-type {
          font-size: 14px;
          color: #868e96;
          padding: 8px 0;
        }
      }
      &:last-of-type {
        height: 100%;
      }
    }
    &:last-of-type {
      flex: 1;
    }
    pre {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border-radius: 4px;
      flex: 1;
      overflow-y: scroll;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.428;
      white-space: pre-wrap;
      background-color: #f3f3f3;
    }
  }
`;

const DetailFile = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;

  ul {
    margin: auto;
    list-style: decimal;

    li {
      font-size: 14px;
      color: #339af0;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
`;

const ReplyProfile = styled.div<{ profile: string }>`
  background-image: url(${(props) => getThumbnail(props.profile)});
  background-size: auto 50px;
  background-position: center;
  background-repeat: no-repeat;
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const DetailReply = styled.div`
  min-height: 250px;
  max-height: 300px;
  margin-bottom: 20px;
  overflow-y: auto;
  ul {
    height: 100%;
  }
  li {
    padding-bottom: 15px;
    font-size: 14px;
    font-weight: 400;
    &:first-of-type {
      padding-top: 10px;
    }
    article {
      display: flex;
      > ${ReplyProfile} {
        margin-right: 10px;
        + div {
          flex: 1;
          padding: 10px;
          border-radius: 0 8px 8px 8px;
          background-color: #f3f3f3;
          > p {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            > span {
              margin-right: 10px;
              :first-of-type {
                font-weight: 550;
                font-size: 14px;
                + span {
                  font-size: 12px;
                }
              }
            }
            svg {
              cursor: pointer;
            }
          }
          pre {
            font-weight: 400;
            line-height: 1.2;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
  ul + div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    display: flex;
    box-sizing: border-box;
    padding: 10px 35px;
    background-color: #f3f3f3;
    > textarea {
      flex: 1;
      height: 30px;
      border: 1px solid ${({ theme }) => theme.colors.borderBlack};
      border-radius: 40px 0 0 40px;
      padding-right: 40px;
      box-sizing: border-box;
      padding-top: 4px;
      padding-left: 20px;
    }
    > button {
      height: 30px;
      padding: 0 20px;
      color: white;
      border-radius: 30px;
      background-color: #228be6;
      margin-left: -30px;
      z-index: 1;
    }
  }
`;
const ToggleTodoButton = styled.span`
  cursor: pointer;
  user-select: none;
  margin-right: 35px;
  color: #868e96;
  font-size: 14px;
  font-weight: 400;
  padding: 8px 10px;
  border-radius: 4px;
  transition: background-color 0.25s ease-in-out;
  background-color: #fff;
  :hover {
    background-color: #f1f3f5;
  }
`;
//#endregion

const EventDetail = observer(() => {
  const rootStore = useRootStore();
  const calendarStore = useCalendarStore();

  const router = useRouter();
  const [isDeleteShow, setDeleteShow] = useState(false);
  const [replys, setReplys] = useState<EventReply[]>([]);
  const detail = useMemo(() => calendarStore.detail, [calendarStore.detail]);

  const isShow = useMemo(() => detail !== undefined, [detail]);
  const diff = useMemo(() => (detail ? DateUtil.diffDay(new Date(detail.endDt), new Date(detail.startDt)) : 0), [
    detail,
  ]);

  const calendar = useMemo(
    () =>
      !detail?.['todoId'] && calendarStore.calendars.find(({ calendarId }) => calendarId === detail?.['calendarId']),
    [detail, calendarStore.calendars],
  );

  const isCommon = useMemo(
    () => detail && calendarStore.commonCalendars.some(({ calendarId }) => calendarId === detail['calendarId']),
    [detail, calendarStore.commonCalendars],
  );

  const onModifyClick = useCallback(() => {
    let url = '';
    if (!detail['todoId']) {
      const { calendarId, startDt, eventId } = detail as EventDetail;
      url = `/calendar/event/write?calendarId=${calendarId}&eventId=${eventId}&date=${DateUtil.format(
        startDt,
        'yyyy-MM-dd',
      )}`;
    } else {
      const { todoId } = detail as TodoDetail;
      url = `/calendar/event/write?todoId=${todoId}`;
    }
    router.push(url);
  }, [detail]);

  const deleteEvent = useCallback(async () => {
    const applyType = document.querySelector<HTMLInputElement>("input[name='applyType']:checked")?.value;

    if (!detail['todoId'] && detail['repeat'] && !applyType) {
      alert('삭제 하실 방법을 선택 해주세요.');
      return;
    }
    if (!detail['todoId']) {
      const { calendarId, eventId, startDt } = detail as EventDetail;
      try {
        if (confirm('삭제 하시겠습니까?')) {
          await axios.put(`/diary/calendar/${calendarId}/event/delete`, { eventId, startDt, applyType });
          await flowResult(calendarStore.syncCalendar());
          calendarStore.setDetail(undefined);
          alert('삭제 되었습니다.');
        }
      } catch (error) {
        alert('권한이 부족합니다.');
      }
    } else {
      const { todoId } = detail as TodoDetail;
      try {
        if (confirm('삭제 하시겠습니까?')) {
          await axios.delete(`/diary/todo/${todoId}`);
          await flowResult(calendarStore.syncTodo());
          calendarStore.setDetail(undefined);
          alert('삭제 되었습니다.');
        }
      } catch {}
    }
  }, [detail]);

  const onDeleteClick = useCallback(() => {
    if (detail['repeat']) {
      setDeleteShow(() => true);
    } else {
      deleteEvent();
    }
  }, [detail]);

  const replySave = useCallback(async () => {
    const replyEl = document.getElementById('reply-textarea') as HTMLTextAreaElement;
    const reply = replyEl.value.trim();
    if (reply) {
      const { calendarId, eventId, startDt } = detail as EventDetail;
      const param = { calendarId, eventId, reply, eventDt: startDt };
      const { data: newEventId } = await axios.post(`/diary/calendar/${calendarId}/event/${eventId}/reply`, param);
      replyEl.value = '';
      if (detail['repeat']) {
        const { data } = await axios.get<EventDetail>(`/diary/calendar/${calendarId}/event/${newEventId}`);
        calendarStore.setDetail(data);
        await flowResult(calendarStore.syncCalendar());
        const scrollObj = document.getElementById('detail-replys-article');
        scrollObj.scrollTop = scrollObj.scrollHeight;
      } else {
        getReplys();
      }
    }
  }, [detail]);

  const onReplyDeleteClick = useCallback(
    async (e: React.MouseEvent<HTMLOrSVGElement>) => {
      if (confirm('댓글을 삭제 하시겠습니까?')) {
        try {
          const { calendarId, eventId } = detail as EventDetail;
          const replyId = e.currentTarget.dataset.replyId;
          await axios.delete(`/diary/calendar/${calendarId}/event/${eventId}/reply/${replyId}`);
          alert('삭제되었습니다.');
          getReplys();
        } catch (error) {
          alert('권한이 부족합니다');
        }
      }
    },
    [detail],
  );

  const getReplys = useCallback(async () => {
    if (isCommon) {
      setReplys(() => []);
    } else {
      const { calendarId, eventId } = detail as EventDetail;
      const { data } = await axios.get(`/diary/calendar/${calendarId}/event/${eventId}/reply`);
      setReplys(() => data);
    }
  }, [detail, isCommon]);

  useEffect(() => {
    setDeleteShow(() => false);
    if (detail && !detail['todoId']) {
      getReplys();
    }
  }, [detail]);

  const onBackgroundClick = useCallback(() => {
    calendarStore.setDetail(undefined);
  }, []);

  const onToggleEndByTodoClick = useCallback(async () => {
    const { todoId, endYn } = detail as TodoDetail;
    await axios.patch(`/diary/todo/end`, { todoId, endYn: endYn === 'Y' ? 'N' : 'Y' });
    const { data } = await axios.get(`/diary/todo/${todoId}`);
    calendarStore.setDetail(data);
    await flowResult(calendarStore.syncTodo());
    toast(`${endYn === 'Y' ? '미완료' : '완료'}로 변경하였습니다`, {
      type: 'info',
      position: 'bottom-center',
      autoClose: 1500,
    });
  }, [detail]);

  return (
    <DetailModal elementId="detail-modal" isShow={isShow} onBackgroundClick={onBackgroundClick}>
      {isDeleteShow && (
        <ApplyPopup>
          <div>
            <p>일정을 삭제하시겠습니까?</p>
            <p>전체 및 이후 반복 일정을 삭제하면, 예외 일정들도 함께 삭제됩니다.</p>
            <CheckBoxWrap>
              <div>
                <input type="radio" id="CURRENT" value="CURRENT" name="applyType" />
                <label htmlFor="CURRENT">이 일정만 삭제</label>
              </div>
              <div>
                <input type="radio" id="AFTER" value="AFTER" name="applyType" />
                <label htmlFor="AFTER">이 일정부터 이후 일정 모두 삭제</label>
              </div>
              <div>
                <input type="radio" id="ALL" value="ALL" name="applyType" />
                <label htmlFor="ALL">전체 반복일정 삭제</label>
              </div>
            </CheckBoxWrap>
            <ButtonWrap>
              <FormButtonBasic
                onClick={() => {
                  setDeleteShow(() => false);
                }}
              >
                취소
              </FormButtonBasic>
              <BlueButton onClick={deleteEvent}>삭제</BlueButton>
            </ButtonWrap>
          </div>
        </ApplyPopup>
      )}
      <header>
        <Color color={calendar?.bgColor ?? TODO_BG_COLOR} />
        <h2>{detail?.['endYn'] === 'Y' ? <del>{detail?.name}</del> : detail?.name}</h2>
        {(detail?.['isModify'] || detail?.['todoId']) && (
          <>
            <Tooltip title="수정" arrow>
              <IconButton onClick={onModifyClick}>
                <MdEdit />
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제" arrow>
              <IconButton onClick={onDeleteClick}>
                <MdDelete />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title="닫기" arrow>
          <IconButton onClick={onBackgroundClick}>
            <MdClose />
          </IconButton>
        </Tooltip>
      </header>
      <input type="radio" name="tab" id="detail-main" defaultChecked />
      <input type="radio" name="tab" id="detail-files" />
      <input type="radio" name="tab" id="detail-replys" />
      {!detail?.['todoId'] && (
        <nav>
          <ul>
            <li className="detail-main">
              <label htmlFor="detail-main">일정</label>
            </li>
            {detail?.['files']?.length > 0 && (
              <li className="detail-files">
                <label htmlFor="detail-files">파일({detail?.['files'].length})</label>
              </li>
            )}
            {!isCommon && (
              <li className="detail-replys">
                <label htmlFor="detail-replys">댓글({replys.length})</label>
              </li>
            )}
          </ul>
        </nav>
      )}
      <article>
        <DetailMain id="detail-main-article">
          <article>
            <ul>
              <li>
                <div>
                  <p>날짜</p>
                  <p>{detail && DateUtil.format(detail.startDt, 'yyyy.MM.dd(E)')}</p>
                </div>
                <div>
                  <p>시간</p>
                  <p>
                    {detail &&
                      !detail['todoId'] &&
                      (detail.allDayYn === 'Y'
                        ? diff === 0
                          ? '종일'
                          : `~ ${DateUtil.format(new Date(detail.endDt), 'MM.dd(EE)')}`
                        : `${DateUtil.format(new Date(detail.startDt), 'HH:mm')} ~ ${
                            diff > 0 ? DateUtil.format(detail.endDt, 'MM.dd(EE) ') : ''
                          }${DateUtil.format(detail.endDt, 'HH:mm')}`)}
                    {detail?.['todoId'] &&
                      (detail.allDayYn === 'Y' ? '종일' : DateUtil.format(new Date(detail.startDt), 'HH:mm'))}
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <p>작성자</p>
                  <p>
                    <ProfileImage profile={detail?.member.photo} />
                    <span>{detail?.member.kornm}</span>
                  </p>
                </div>
                {detail?.['todoId'] && detail?.endDt && (
                  <div>
                    <p>완료시간</p>
                    <p>{DateUtil.format(new Date(detail.endDt), 'yyyy.MM.dd HH:mm:ss(EE)')}</p>
                  </div>
                )}
              </li>
              {detail?.note && (
                <li>
                  <div>
                    <p>내용</p>
                    <pre>{detail?.note}</pre>
                  </div>
                </li>
              )}
            </ul>
          </article>
        </DetailMain>
        {!detail?.['todoId'] && (
          <DetailFile id="detail-files-article">
            <ul>
              {detail?.['files'].map(({ fileId, file: { orgNm, fsize } }) => (
                <li
                  key={`detail-file-${fileId}`}
                  onClick={() => {
                    window.open(`${config.baseURL}/file/${fileId}`);
                  }}
                >
                  {orgNm} ({FileUtil.getFileSize(fsize)})
                </li>
              ))}
            </ul>
          </DetailFile>
        )}
        {!isCommon && !detail?.['todoId'] && (
          <DetailReply id="detail-replys-article">
            <ul>
              {replys.map(({ replyId, member: { photo, kornm, userId }, retdt, reply }) => (
                <li key={`detail-reply-${replyId}`}>
                  <article>
                    <ReplyProfile profile={photo} />
                    <div>
                      <p>
                        <span>{kornm}</span>
                        <span>{DateUtil.distanceByToday(new Date(retdt))}</span>
                        {userId === rootStore.member.userId && (
                          <AiOutlineClose size={14} onClick={onReplyDeleteClick} data-reply-id={replyId} />
                        )}
                      </p>
                      <pre>{reply}</pre>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <div>
              <textarea
                id="reply-textarea"
                placeholder="새로운 댓글을 입력해주세요."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    replySave();
                  }
                }}
              ></textarea>
              <button onClick={replySave}>등록</button>
            </div>
          </DetailReply>
        )}
      </article>
      {detail?.['todoId'] && (
        <footer>
          <ToggleTodoButton onClick={onToggleEndByTodoClick}>
            {detail['endYn'] === 'Y' ? '미완료' : '완료'}로 변경
          </ToggleTodoButton>
        </footer>
      )}
    </DetailModal>
  );
});

export default EventDetail;
