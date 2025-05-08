import styled from "@emotion/styled";
import React from "react";

//#region styled
const FullPage = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;

  @keyframes cubeGridScaleDelay {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }
`;

const CubeBox = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
`;

const CubeItem = styled.div`
  width: 33%;
  height: 33%;
  background-color: #333;
  float: left;
  animation: cubeGridScaleDelay 1.3s infinite ease-in-out;
  &.cube1,
  &.cube5,
  &.cube9 {
    animation-delay: 0.2s;
  }
  &.cube2,
  &.cube6 {
    animation-delay: 0.3s;
  }
  &.cube3 {
    animation-delay: 0.4s;
  }
  &.cube4,
  &.cube8 {
    animation-delay: 0.1s;
  }

  &.cube7 {
    animation-delay: 0s;
  }
`;

//#endregion

const FullPageLoading = () => (
  <FullPage>
    <CubeBox>
      <CubeItem className="cube1"></CubeItem>
      <CubeItem className="cube2"></CubeItem>
      <CubeItem className="cube3"></CubeItem>
      <CubeItem className="cube4"></CubeItem>
      <CubeItem className="cube5"></CubeItem>
      <CubeItem className="cube6"></CubeItem>
      <CubeItem className="cube7"></CubeItem>
      <CubeItem className="cube8"></CubeItem>
      <CubeItem className="cube9"></CubeItem>
    </CubeBox>
  </FullPage>
);

export default FullPageLoading;
