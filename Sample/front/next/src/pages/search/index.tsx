import { useCalendarStore } from '@components/common/context/RootStore';
import MainLayout from '@components/layout/main';
import styled from '@emotion/styled';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateUtil } from '@utils/date.util';
import { LocalizedDateUtils } from '@utils/datepicker.utils';
import { serverAxios } from '@utils/network.util';
import { StringUtil } from '@utils/string.util';
import { ko } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import Select from 'react-dropdown-select';
import { useFieldArray, useForm } from 'react-hook-form';
import { IoMdSearch } from 'react-icons/io';

//#region styled
const Wrap = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  width: 100%;
  display: flex;
  height: 100%;
  box-sizing: border-box;
`;
const MainWrap = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.section`
  padding: 10px 20px;
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f1f3f5;
  align-items: center;
`;
const SearchIcon = styled(IoMdSearch)``;
const MainSearchBox = styled.div`
  width: 80%;
  background-color: white;
  box-sizing: border-box;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 4px;

  > ${SearchIcon} {
    position: absolute;
    left: 15px;
  }
  > input {
    flex: 1;
    height: 100%;
    padding: 0 30px;
    font-size: 18px;
    border: none;
    ::placeholder {
      font-size: 18px;
    }
  }
  > button {
    margin-left: 15px;
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100px;
    height: 100%;
    border-radius: 4px;
    color: white;
  }
`;
const SubSearchBox = styled.div`
  width: 80%;
  flex: 1;
  align-items: center;
  display: flex;
  > article {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
`;
const SearchLabel = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
`;

const DatePickerInput = styled(DatePicker)`
  width: 144px;
  height: 36px;
  border-bottom: none;
  align-items: center !important;
  background-color: white;
  > div {
    margin: auto 0;
    &:before,
    &:after {
      border: none;
    }
    &:hover {
      &:before,
      &:after {
        border: none !important;
      }
    }
    > input {
      padding: 0;
      padding-left: 10px;
      padding-right: 38px;
      background-color: ${({ theme }) => theme.colors.white};
      background: url('/images/ico/ico_calendar.png') right 10px center no-repeat;
    }
  }
`;
const CalendarSelect = styled(Select)`
  width: 200px !important;
  background-color: white;
  border: none !important;
`;

const SelectContent = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 170px;
`;

const ListBox = styled.section`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  padding: 0 20px;
  box-sizing: border-box;
`;

const SearchArticle = styled.article`
  display: grid;
  width: 79%;
  margin: 0 auto;
  grid-template-columns: 30px 130px 165px 1fr 1fr;
  grid-template-rows: 40px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  > i {
    margin-top: 2px;
    place-self: center;
  }
  > span {
    font-size: 15px;
    margin-left: 5px;
    &:first-of-type {
      place-self: center;
    }
    &:nth-of-type(2) {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.borderBlack};
    }

    &:nth-of-type(3),
    &:last-of-type {
      color: ${({ theme }) => theme.colors.borderBlack};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Color = styled.i<{ color: string }>`
  width: 18px;
  border-radius: 50%;
  height: 18px;
  background-color: ${(props) => props.color};
`;

const SearchTitle = styled.article`
  display: grid;
  width: 79%;
  margin: 0 auto;
  grid-template-columns: 30px 130px 165px 1fr 1fr;
  grid-template-rows: 40px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  > span {
    font-weight: bold;
    text-align: center;
    &:first-of-type {
      text-align: start;
    }
  }
`;
//#endregion

type SearchPageProps = {
  data: EventDetail[];
  calendars: { calendarId: string }[];
  start: string;
  end: string;
  search: string;
};

const SearchPage = ({ data, search, ...form }: SearchPageProps) => {
  const router = useRouter();
  const calendar = useCalendarStore();

  const { register, control, watch, getValues, setValue } = useForm({
    defaultValues: { q: search, ...form },
  });

  const { fields, remove, append } = useFieldArray({ control, name: 'calendars' });

  const calendars = watch('calendars');
  const start = watch('start');
  const end = watch('end');

  const calendarSelectContent = useCallback(() => {
    let text = '전체';
    if (fields.length > 0 && fields.length < 3) {
      text = calendars.map(({ calendarId }) => calendar.calendarMap[calendarId]?.name).join(', ');
    }
    if (fields.length > 2) {
      text = `${fields.length}개의 캘린더 선택`;
    }
    return <SelectContent>{text}</SelectContent>;
  }, [fields, calendar.calendars]);

  const onSearch = useCallback(() => {
    const { q, calendars, end, start } = getValues();
    if (!q) {
      alert('검색하실 단어를 입력해 주세요.');
      return;
    }

    const query = {
      q: q,
      groups: calendars?.map(({ calendarId }) => calendarId).join(','),
      start,
      end,
    };

    const url = `/search?${StringUtil.queryStringfy(query)}`;
    router.push(url);
  }, [getValues]);

  const onChangeSelect = useCallback(
    (calendars: { calendarId: string }[]) => {
      remove();
      append(calendars.map(({ calendarId }) => ({ calendarId })));
    },
    [fields],
  );

  const onStartChange = useCallback(
    (date: Date) => {
      const end = new Date(getValues('end'));
      const diff = DateUtil.diffDay(end, date);
      if (diff >= 365 || diff < 0) {
        setValue('end', DateUtil.format(DateUtil.addDay(date, 364), 'yyyy-MM-dd'));
      }
      setValue('start', DateUtil.format(date, 'yyyy-MM-dd'));
      onSearch();
    },
    [setValue],
  );

  const onEndChange = useCallback(
    (date: Date) => {
      const start = new Date(getValues('start'));
      const diff = DateUtil.diffDay(date, start);
      if (diff >= 365) {
        alert('1년까지 검색 가능합니다.');
        return;
      }
      setValue('end', DateUtil.format(date, 'yyyy-MM-dd'));
      onSearch();
    },
    [setValue],
  );

  const render = useMemo(() => {
    return data.map(({ calendarId, startDt, endDt, allDayYn, name, note }, idx) => {
      const start = new Date(startDt);
      const end = new Date(endDt);
      const diff = DateUtil.diffDay(end, start);
      const format = DateUtil.format;
      return (
        <li key={`event-search-${idx}`}>
          <SearchArticle>
            <Color color={calendar.calendarMap[calendarId].bgColor} />
            <span>{format(start, 'yyyy.MM.dd(EE)')}</span>
            <span>
              {allDayYn === 'Y'
                ? diff === 0
                  ? '종일'
                  : `~ ${format(end, 'MM.dd(EE)')}`
                : `${format(startDt, 'HH:mm')} ~ ${diff > 0 ? format(end, 'MM.dd(EE) ') : ''}${format(end, 'HH:mm')}`}
            </span>
            <span dangerouslySetInnerHTML={{ __html: StringUtil.textHighlighting(name, search) }} />
            <span dangerouslySetInnerHTML={{ __html: StringUtil.textHighlighting(note ?? '', search) }} />
          </SearchArticle>
        </li>
      );
    });
  }, [data, search]);

  return (
    <MuiPickersUtilsProvider utils={LocalizedDateUtils} locale={ko}>
      <MainLayout title={'일정 검색'}>
        <Wrap>
          <MainWrap>
            <SearchBox>
              <MainSearchBox>
                <input
                  name="q"
                  ref={register({ required: true })}
                  placeholder="검색어를 입력해주세요."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onSearch();
                    }
                  }}
                />
                <input type="hidden" name="start" ref={register} />
                <input type="hidden" name="end" ref={register} />
                {fields.map((filed, idx) => (
                  <input
                    key={filed.calendarId}
                    type="hidden"
                    name={`calendars[${idx}].calendarId`}
                    ref={register()}
                    defaultValue={filed.calendarId}
                  />
                ))}
                <button type="button" onClick={onSearch}>
                  검색
                </button>
              </MainSearchBox>
              <SubSearchBox>
                <article>
                  <SearchLabel>시작일</SearchLabel>
                  <DatePickerInput autoOk variant="inline" value={start} onChange={onStartChange} />
                </article>
                <article>
                  <SearchLabel>종료일</SearchLabel>
                  <DatePickerInput
                    autoOk
                    variant="inline"
                    value={end}
                    onChange={onEndChange}
                    minDate={start}
                    maxDate={DateUtil.addDay(new Date(start), 365)}
                    maxDateMessage={'1년까지 검색가능합니다.'}
                  />
                </article>
                <article>
                  <SearchLabel>그룹 선택</SearchLabel>
                  <CalendarSelect
                    multi
                    options={calendar.calendars}
                    values={calendars}
                    onChange={onChangeSelect}
                    valueField="calendarId"
                    labelField="name"
                    searchBy="name"
                    required={false}
                    onDropdownClose={onSearch}
                    noDataLabel={'캘린더가 없습니다.'}
                    contentRenderer={calendarSelectContent}
                  />
                </article>
              </SubSearchBox>
            </SearchBox>
            <ListBox>
              <ul>
                <li>
                  <SearchTitle>
                    <span>그룹</span>
                    <span>일자</span>
                    <span>시간</span>
                    <span>제목</span>
                    <span>내용</span>
                  </SearchTitle>
                </li>
                {render}
              </ul>
            </ListBox>
          </MainWrap>
        </Wrap>
      </MainLayout>
    </MuiPickersUtilsProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q = '', range = new Date().getFullYear().toString(), groups = '' } = ctx.query as {
    q: string;
    range: string;
    groups: string;
  };
  const calendars = groups
    .split(',')
    .filter((group) => group)
    .map((calendarId) => ({ calendarId }));
  let [start, end] = range.split(',');

  let yyyy = Number(start);
  // range 가 없거나 4자리인 경우 해당 년도만 검색되도록
  if (start.length === 4) {
    // 잘못 세팅된 경우 무조건 올해로 변경
    if (isNaN(yyyy) || yyyy < 1970 || yyyy > 2100) {
      yyyy = new Date().getFullYear();
    }
    start = DateUtil.format(new Date(yyyy, 0, 1), 'yyyy-MM-dd');
    end = DateUtil.format(new Date(yyyy, 11, 31), 'yyyy-MM-dd');
  }

  const diff = DateUtil.diffDay(new Date(end), new Date(start));
  // 시작일 보다 작거나  차이가 1년이상 날 경우
  if (diff >= 365 || diff < 0) {
    end = DateUtil.format(DateUtil.addDay(DateUtil.addMonth(new Date(start), 12), -1), 'yyyy-MM-dd');
  }

  const params = {
    calendarIds: groups,
    start,
    end,
    search: q,
  };
  // 검색어가 없으면 보내지 않는다.
  if (!q) {
    return { props: { ...params, data: [] } };
  } else {
    const { data } = await serverAxios(ctx).get(`/diary/calendar/search`, {
      params,
    });
    return { props: { ...params, calendars, data } };
  }
};

export default observer(SearchPage);
