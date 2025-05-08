import { useCalendarStore } from '@components/common/context/RootStore';
import MyPagePopup from '@components/mypage/popup';
import styled from '@emotion/styled';
import useToggle from '@hooks/useToggle';
import { DateUtil } from '@utils/date.util';
import { KmemoUtil } from '@utils/kmemo.util';
import { axios } from '@utils/network.util';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  > div {
    display: flex;
    align-items: center;
    > button {
      width: 44px;
      height: 24px;
      border: 1px solid ${({ theme }) => theme.colors.borderLight};
      border-radius: 2px;
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black};
      margin-right: 10px;
      + button {
        margin-right: 0;
      }
      + div {
        display: inline-block;
        padding: 0 20px;
        > span {
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          color: ${({ theme }) => theme.colors.black};
          padding: 0 20px;
          cursor: pointer;
        }
        > button {
          width: 24px;
          height: 24px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          text-indent: -9999px;

          &:nth-of-type(1) {
            background-image: url('/images/btn/btn_calandar_prev_main.png');
          }
          &:nth-of-type(2) {
            background-image: url('/images/btn/btn_calandar_next_main.png');
          }
        }
      }
    }
    + div > p {
      font-size: 13px;
      color: #999999;
      padding-left: 19px;
      background: url('/images/ico/ico_i.png') left center no-repeat;
      > a {
        display: inline-block;
        color: #00c73c;
        padding-right: 10px;
        cursor: pointer;
        background: url('/images/ico/ico_tip_green.png') right center no-repeat;
      }
    }
  }
`;

const FullPage = styled.div`
  z-index: 888;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    padding: 20px;
  }
`;

const DateSelectTop = styled.div`
  > button {
    width: 24px;
    height: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    text-indent: -9999px;

    &:nth-of-type(1) {
      background-image: url('/images/btn/btn_calandar_prev_main.png');
    }
    &:nth-of-type(2) {
      background-image: url('/images/btn/btn_calandar_next_main.png');
    }
  }
  > span {
    font-family: 'Lato', tahoma, 'MalgunGothic', 'Verdana', 'Arial', 'Helvetica', sans-serif;
    display: inline-block;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.black};
    padding: 0 20px;
    vertical-align: bottom;
  }
`;

const MonthSelectWrap = styled.div`
  margin-top: 10px;
  width: 100%;

  ul {
    display: flex;
    justify-content: space-around;
    + ul {
      margin-top: 10px;
    }
  }
`;

const MonthSelectItem = styled.li<{ isActive: boolean }>`
  display: inline-block;
  width: calc(100% / 6 - 8.4px);
  height: 60px;
  cursor: pointer;
  > a {
    font-family: 'Lato', tahoma, 'MalgunGothic', 'Verdana', 'Arial', 'Helvetica', sans-serif;
    display: block;
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    box-sizing: border-box;
    border-radius: 5px;
    line-height: 58px;
    font-size: 16px;
    color: #999999;
    text-align: center;
    ${({ isActive, theme }) =>
      isActive &&
      `border-color:${theme.colors.primary}; background-color:${theme.colors.primary}; color:${theme.colors.white};`}
  }
  + li {
    margin-left: 5px;
  }
`;

const PopCont = styled.pre`
  padding: 20px 18px 40px;
  white-space: break-spaces;
  > iframe {
    width: 100%;
  }
`;
const InputWrap = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  margin-left: auto;
  input {
    width: 200px;
    height: 32px;
    right: 0;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    padding-right: 10px;
    + button {
      position: absolute;
      top: 0;
      right: 3px;
      width: 32px;
      height: 32px;
      background: url('/images/ico/ico_search_black_18x18.png') center no-repeat;
      background-size: 18px;
      border: none;
      margin-right: 0;
    }
  }
`;

const MainHeader = observer(() => {
  const calendarStore = useCalendarStore();
  const date = calendarStore.date;
  const router = useRouter();
  const pathname = useMemo(() => router.pathname, [router.pathname]);
  const searchRef = useRef<HTMLInputElement>();
  const [toggle, changeToggle] = useToggle();
  const [yyyy, setYyyy] = useState<number>();
  const [tipPopToggle, changeTipPopToggle] = useToggle();
  const [tip, setTip] = useState<string>();

  const dateStr = useMemo(() => DateUtil.format(date, 'yyyy.MM'), [date]);

  const goToMainPage = useCallback(() => {
    if (pathname !== '/') {
      router.replace('/');
    }
  }, [pathname]);

  const months = useMemo(() => {
    const months: {
      text: string;
      dateStr: string;
    }[] = [];
    if (yyyy) {
      for (let i = 0; i < 12; i++) {
        months.push({
          text: `${(i + 1).toString()}월`,
          dateStr: DateUtil.format(new Date(yyyy, i, 1), 'yyyy-MM-dd'),
        });
      }
    }

    return months;
  }, [yyyy]);

  const tipTitle = useMemo(() => {
    const mm = DateUtil.format(date, 'MM');
    return mm + '월의 업무팁';
  }, [date]);

  const tipContent = useCallback(async () => {
    const yyyymm = DateUtil.format(date, 'yyyyMM');
    const { data } = await axios.get(`/diary/tip/${yyyymm}`);
    setTip(data.note);
  }, [date]);

  const onYearAddClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setYyyy(yyyy + Number(e.currentTarget.dataset.add));
    },
    [yyyy],
  );

  useEffect(() => {
    setYyyy(date.getFullYear());
    tipContent();
  }, [date]);

  const onTodayClick = useCallback(() => {
    calendarStore.setDate(new Date());
    goToMainPage();
  }, []);

  const onMonthAddClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const add = Number(e.currentTarget.dataset.add);
      if (router.pathname === '/') {
        calendarStore.setDate(DateUtil.addMonth(date, add));
      } else if (router.pathname === '/week') {
        const ymd = router.query.ymd as string;
        const weekDate = DateUtil.ymdToDate(ymd);
        const nextWeek = DateUtil.addDay(weekDate, add * 7);
        // 다음 주 세팅
        router.push(`/week?ymd=${DateUtil.format(nextWeek, 'yyyyMMdd')}`);
      }
    },
    [date, router],
  );

  const onMonthSelectClick = useCallback(
    (dateStr: string) => {
      calendarStore.setDate(new Date(dateStr));
      changeToggle();
      goToMainPage();
    },
    [changeToggle],
  );

  const onCalendarSearch = useCallback(() => {
    const search = searchRef.current.value;
    router.push(`/search?q=${search}`);
  }, [searchRef]);

  const CalendarSearch = useMemo(() => {
    return (
      <InputWrap>
        <input
          ref={searchRef}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onCalendarSearch();
            }
          }}
        />
        <button onClick={onCalendarSearch} />
      </InputWrap>
    );
  }, [searchRef, onCalendarSearch]);

  return (
    <CalendarHeader>
      <div>
        <button type="button" onClick={onTodayClick}>
          오늘
        </button>
        {router.pathname === '/week' ? (
          <Link href={`/`}>
            <button type="button">월간</button>
          </Link>
        ) : (
          <Link href={`/week?ymd=${DateUtil.format(calendarStore.date, 'yyyyMMdd')}`}>
            <button type="button">주간</button>
          </Link>
        )}
        <div>
          <button data-add={-1} onClick={onMonthAddClick}>
            prev
          </button>
          <span onClick={changeToggle}>{dateStr}</span>
          <button data-add={1} onClick={onMonthAddClick}>
            next
          </button>
        </div>
      </div>
      <div>
        <p>
          필독하면 좋은 <a onClick={changeTipPopToggle}>이달의 업무팁</a>
        </p>
      </div>
      {CalendarSearch}
      {toggle && (
        <FullPage onClick={changeToggle}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DateSelectTop>
              <button data-add={-1} onClick={onYearAddClick}>
                prev
              </button>
              <span>{yyyy}</span>
              <button data-add={1} onClick={onYearAddClick}>
                next
              </button>
            </DateSelectTop>
            <MonthSelectWrap>
              <ul>
                {months.slice(0, 6).map(({ dateStr, text }) => (
                  <MonthSelectItem
                    isActive={DateUtil.isSameMonth(date, new Date(dateStr))}
                    key={`month-select-${dateStr}`}
                    onClick={() => {
                      onMonthSelectClick(dateStr);
                    }}
                  >
                    <a>{text}</a>
                  </MonthSelectItem>
                ))}
              </ul>
              <ul>
                {months.slice(6).map(({ dateStr, text }) => (
                  <MonthSelectItem
                    isActive={DateUtil.isSameMonth(date, new Date(dateStr))}
                    key={`month-select-${dateStr}`}
                    onClick={() => {
                      onMonthSelectClick(dateStr);
                    }}
                  >
                    <a>{text}</a>
                  </MonthSelectItem>
                ))}
              </ul>
            </MonthSelectWrap>
          </div>
        </FullPage>
      )}
      {tipPopToggle && (
        <MyPagePopup title={tipTitle} onClose={changeTipPopToggle}>
          <PopCont>
            <iframe
              onLoad={(frame) => {
                KmemoUtil.resizeIframe(frame);
              }}
              srcDoc={`
                  <!doctype html>
                  <html lang="utf-8">
                  <head>
                    <meta charset="utf-8">
                    <link href="//cdn.quilljs.com/1.2.6/quill.snow.css?1=1" rel="stylesheet"> 
                  </head>
                  <body>
                    <div class="ql-editor">${tip}</div>
                  </body>
                  </html>`}
            />
          </PopCont>
        </MyPagePopup>
      )}
    </CalendarHeader>
  );
});

export default MainHeader;
