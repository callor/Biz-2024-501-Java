import styled from '@emotion/styled';
import { DateUtil } from '@utils/date.util';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const FullPageWrap = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: auto;
  height: 500px;
  box-shadow: -3px 2px 300px 2px black;
`;

const popupList = new Set([]);

const NoticePopup = () => {
  //@TODO: 나중에 DB화 시켜서 팝업 올리깅
  const [isShowPopup, setShowPopup] = useState(false);
  const cookies = new Cookies();
  useEffect(() => {
    let isShowPopup = false;
    popupList.forEach((pop) => {
      if (!Object.keys(cookies.getAll()).includes(pop)) {
        isShowPopup = true;
      }
    });
    setShowPopup(isShowPopup);
  }, []);

  const onClick = useCallback(() => {
    setShowPopup((curr) => !curr);
    cookies.set('POPUP_SYSTEM', '1', { expires: DateUtil.addDay(new Date(), 1) });
  }, []);

  return (
    <>
      {isShowPopup && (
        <FullPageWrap onClick={onClick}>
          <Img src={'/images/popup/systemFix.jpg'} alt={'시스템 정상화 팝업'} />
        </FullPageWrap>
      )}
    </>
  );
};

export default NoticePopup;
