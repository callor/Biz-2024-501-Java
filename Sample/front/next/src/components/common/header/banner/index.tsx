import styled from "@emotion/styled";
import { TOP_BANNER, TOP_BANNER_SHOW } from "@utils/contants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";

//#region styled
const BannerWrap = styled.div`
  position: relative;
  width: 100%;
  height: 90px;

  > a {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  > button {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: url("${({ theme }) => theme.images.bannerClose}") center
      no-repeat;
  }
`;
//#endregion

const HeaderBanner = ({ bannerImage = "/images/common/top_banner.jpg" }) => {
  const [isShow, setShow] = useState(false);

  const backgroundImage = useMemo(() => `url(${bannerImage})`, [bannerImage]);

  const onCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // 하루동안 보지 않기
    new Cookies().set(TOP_BANNER, TOP_BANNER_SHOW, { maxAge: 3600 * 24 });
    setShow(false);
  }, []);

  useEffect(() => {
    setShow(new Cookies().get(TOP_BANNER) !== TOP_BANNER_SHOW);
  }, []);

  return (
    isShow && (
      <BannerWrap>
        <a
          style={{ backgroundImage: backgroundImage }}
          href="https://coninfo.co.kr/"
          target="_blank"
        ></a>
        <button onClick={onCloseClick}></button>
      </BannerWrap>
    )
  );
};

export default HeaderBanner;
