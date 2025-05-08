import { GetServerSideProps } from "next";
import { axios, serverAxios } from "@utils/network.util";
import MainLayout from "@components/layout/main";
import styled from "@emotion/styled";
import CompactColorPicker from "@components/common/colorpicker/CompactColorPicker";
import ButtonWrap from "@components/common/button/ButtonWrap";
import { BlueButton } from "@components/common/button";
import { FormButtonBasic } from "@components/mypage/form";
import { useForm } from "react-hook-form/dist/index.ie11";
import { useCallback, useEffect, useMemo, useState } from "react";
import useWindowSize from "@hooks/useWindowSize";
import { ColorResult } from "react-color";
import { useRouter } from "next/router";

//#region styled
const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftWrap = styled.div`
  width: 30px;
  flex: 0 0 30px;
  height: 100%;
  border-right: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

const MainWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const TableWrap = styled.div`
  height: 100%;
  padding: 20px 20px 10px;
  box-sizing: border-box;
  width: 540px;
  float: left;
`;

const CalendarListWrap = styled.div`
  width: 220px;
  height: 100%;
  border: 1px solid #dbdbdb;
  border-top: 1px solid #454545;
  border-bottom: none;
  box-sizing: border-box;
  float: left;
`;

const CalendarSettingWrap = styled(CalendarListWrap)`
  width: 270px;
  margin-left: 10px;
  ${ButtonWrap} {
    margin-top: 10px;

    button {
      width: 60px;
      height: 24px;
      line-height: 22px;
      border-radius: 2px;
      font-size: 12px;

      + button {
        margin-left: 7px;
      }
    }
  }
`;

const TableTop = styled.div`
  height: 42px;
  background: #fafafa;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  > p {
    line-height: 42px;
    font-size: 14px;
    font-weight: 500;
    color: #252525;
    text-align: center;
  }
`;

const Table = styled.div`
  height: calc(100% - 42px);
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  overflow-y: auto;
  > ul > li {
    height: 36px;
    font-size: 14px;
    line-height: 35px;
    border-bottom: 1px solid #dbdbdb;
    padding-left: 7px;
    box-sizing: border-box;

    cursor: pointer;
  }
`;

const InputWrap = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 10px 10px 12px;
  position: relative;
  > input[type="text"] {
    width: 100%;
    height: 36px;
  }
`;

const CheckBox = styled.div`
  display: inline-block;
  + div {
    margin-left: 40px;
  }

  input[type="checkbox"] {
    display: none;
    + label {
      display: inline-block;
      font-size: 14px;
      color: #454545;
      line-height: 24px;
      padding-left: 34px;

      background: url("/images/btn/btn_checkbox_no_24x24.png") left center
        no-repeat;
    }
    &:checked + label {
      background: url("/images/btn/btn_checkbox_yes_24x24.png") left center
        no-repeat;
    }
  }
`;

const ColorPicker = styled(CompactColorPicker)`
  position: relative;
  width: 118px;
  height: 36px;
  padding-right: 32px;
  box-sizing: border-box;
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-image: url("/images/ico/ico_color_text.png");
`;

const BgColorPicker = styled(ColorPicker)`
  margin-left: 10px;
  background-image: url("/images/ico/ico_color_bg.png");
  background-position: right 5px center;
`;

const Banner = styled.div<{ imageUrl: string }>`
  float: left;
  width: calc(100% - 560px);
  height: 100%;
  margin-left: 20px;
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
  background-color: #e8eff5;
  background-image: url("${(props) => props.imageUrl}");
  cursor: pointer;
`;

const PreviewEvent = styled.p<{ bgColor: string; color: string }>`
  width: 100%;
  line-height: 15px;
  font-size: 13px;
  padding: 3px 0 3px 10px;
  box-sizing: border-box;
  border-radius: 8px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

const CalendarItem = styled.li<{ isOn: boolean }>`
  background-color: ${(props) => (props.isOn ? "#6485ae" : "#f5f6f8")};
  color: ${(props) => (props.isOn ? "#fff" : "#888e9c")};
`;

//#endregion

type CalendarSettingPageProps = {
  calendars: CalendarUsr[];
};

const CalendarSettingPage = ({ calendars }: CalendarSettingPageProps) => {
  const windowSize = useWindowSize();
  const router = useRouter();
  const bannerImage = useMemo(
    () =>
      windowSize.width <= 1280
        ? "/images/sub/setting_banner_1280.jpg"
        : "/images/sub/setting_banner.jpg",
    [windowSize]
  );
  const { register, reset, setValue, getValues } = useForm({
    defaultValues: { name: "", color: "", bgColor: "", useYn: "" },
  });

  const [calendarColor, setCalendarColor] = useState<{
    color: string;
    bgColor: string;
  }>();

  const [calendarId, setCalendarId] = useState<string>();

  const getCalendarData = useCallback(async (calendarId: string) => {
    setCalendarId(calendarId);
    if (calendarId) {
      const { data: calendar } = await axios.get<CalendarUsr>(
        `/diary/calendar/${calendarId}`
      );
      setCalendarColor({
        color: calendar.color,
        bgColor: calendar.bgColor,
      });
      setValue("color", calendar.color);
      setValue("bgColor", calendar.bgColor);
      setValue("name", calendar.name);
      setValue("useYn", calendar.useYn === "Y" ? "Y" : "");
    } else {
      setCalendarColor(undefined);
      reset();
    }
  }, []);

  useEffect(() => {
    getCalendarData(calendars[0]?.calendarId);
  }, []);

  const onCalendarSelectClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const { calendarId } = e.currentTarget.dataset;
      getCalendarData(calendarId);
    },
    []
  );

  const onColorChange = useCallback(
    (color: ColorResult) => {
      setValue("color", color.hex);
      setCalendarColor({ color: color.hex, bgColor: calendarColor.bgColor });
    },
    [calendarColor]
  );

  const onBgColorChange = useCallback(
    (color: ColorResult) => {
      setValue("bgColor", color.hex);
      setCalendarColor({ color: calendarColor.color, bgColor: color.hex });
    },
    [calendarColor]
  );

  const CalendarList = useMemo(
    () =>
      calendars.map(({ calendarId: _calendarId, name }) => (
        <CalendarItem
          data-calendar-id={_calendarId}
          key={`calendar-list-${_calendarId}`}
          onClick={onCalendarSelectClick}
          isOn={calendarId === _calendarId}
        >
          {name}
        </CalendarItem>
      )),
    [calendarId]
  );

  const onBlurColorChange = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCalendarColor({ ...calendarColor, [name]: value });
    },
    [calendarColor]
  );

  const onDeleteCalendarClick = useCallback(async () => {
    if (calendarId && confirm("해당 그룹을 삭제하시겠습니까 ?")) {
      await axios.delete(`/diary/calendar/${calendarId}`);
      alert("삭제 되었습니다.");
      router.reload();
    }
  }, [calendarId]);

  const onModifyCalendarClick = useCallback(async () => {
    if (calendarId) {
      const { name, useYn, bgColor, color } = getValues();
      if (!name) {
        alert("그룹명을 설정하셔야 합니다.");
        return;
      }
      if (!(color && bgColor)) {
        alert("사용하실 색상을 선택 하셔야합니다.");
        return;
      }
      const param = {
        calendarId,
        name,
        color,
        bgColor,
        useYn: useYn ? "Y" : "N",
      };
      await axios.put(`/diary/calendar`, param);
      alert("수정 되었습니다.");
      router.reload();
    }
  }, [calendarId]);

  const openConinfo = useCallback(() => {
    window.open("https://coninfo.co.kr/", "_blank");
  }, []);

  return (
    <MainLayout title={"그룹 설정"}>
      <Wrap>
        <LeftWrap />
        <MainWrap>
          <TableWrap>
            <CalendarListWrap>
              <TableTop>
                <p>그룹목록</p>
              </TableTop>
              <Table>
                <ul>{CalendarList}</ul>
              </Table>
            </CalendarListWrap>
            <CalendarSettingWrap>
              <TableTop>
                <p>그룹설정</p>
              </TableTop>
              <InputWrap>
                <CheckBox>
                  <input
                    type="checkbox"
                    id="useYn"
                    name="useYn"
                    value="Y"
                    ref={register}
                    readOnly={calendarId === undefined}
                  />
                  <label htmlFor="useYn">사용</label>
                </CheckBox>
                {/* <CheckBox>
                  <input type="checkbox" id="comment" />
                  <label htmlFor="comment">댓글허용</label>
                </CheckBox> */}
              </InputWrap>
              <TableTop>
                <p>그룹명설정</p>
              </TableTop>
              <InputWrap>
                <input type="text" ref={register} name={"name"} />
              </InputWrap>
              <TableTop>
                <p>색상설정</p>
              </TableTop>
              <InputWrap>
                <ColorPicker
                  ref={register}
                  name={"color"}
                  color={calendarColor?.color}
                  readOnly={calendarId === undefined}
                  onColorChange={onColorChange}
                  onBlur={onBlurColorChange}
                />
                <BgColorPicker
                  ref={register}
                  name={"bgColor"}
                  color={calendarColor?.bgColor}
                  readOnly={calendarId === undefined}
                  onColorChange={onBgColorChange}
                  onBlur={onBlurColorChange}
                />
              </InputWrap>
              <TableTop>
                <p>색상 미리보기</p>
              </TableTop>
              <InputWrap>
                {calendarColor && (
                  <PreviewEvent
                    color={calendarColor.color}
                    bgColor={calendarColor.bgColor}
                  >
                    - 현재 그룹의 설정된 색상 입니다.
                  </PreviewEvent>
                )}
              </InputWrap>
              {calendarId && (
                <ButtonWrap>
                  <BlueButton onClick={onModifyCalendarClick}>저장</BlueButton>
                  <FormButtonBasic onClick={onDeleteCalendarClick}>
                    삭제
                  </FormButtonBasic>
                </ButtonWrap>
              )}
            </CalendarSettingWrap>
          </TableWrap>
          <Banner imageUrl={bannerImage} onClick={openConinfo} />
        </MainWrap>
      </Wrap>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: calendars } = await serverAxios(ctx).get("/diary/calendar/all");
  return { props: { calendars } };
};

export default CalendarSettingPage;
