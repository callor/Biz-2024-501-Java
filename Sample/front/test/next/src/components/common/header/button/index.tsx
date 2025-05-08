import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

const ButtonWrap = styled.a`
  position: relative;
  display: inline-block;
  width: 38px;
  height: 36px;
  line-height: 36px;
  font-size: 0;
  text-align: center;
  cursor: pointer;
  > img {
    display: inline-block;
    margin: 0 auto;
    vertical-align: middle;
  }
`;

type HeaderButton = {
  base: string;
  on: string;
  alt: string;
  className?: string;
};

interface HeadrButtonProps extends HeaderButton {
  link?: string;
  onClick?: Function;
  isActive?: boolean;
}

const HeaderButton = ({
  base,
  on,
  alt,
  link,
  onClick,
  className,
  isActive: _isActive,
}: HeadrButtonProps) => {
  const router = useRouter();
  const [isActive, setActive] = useState(_isActive);

  const buttonClick = useCallback(() => {
    if (link) {
      router.push(link);
    } else if (onClick) {
      onClick();
    }
  }, [isActive, onClick]);

  useEffect(() => {
    if (link) {
      setActive(router.pathname === link);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (typeof _isActive !== "undefined") {
      setActive(_isActive);
    }
  }, [_isActive]);

  return (
    <ButtonWrap onClick={buttonClick} className={className}>
      <img src={isActive ? on : base} alt={alt} />
    </ButtonWrap>
  );
};

export default HeaderButton;
