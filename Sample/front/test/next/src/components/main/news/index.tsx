import styled from "@emotion/styled";
import Slider, { Settings } from "react-slick";
import "@styles/slick/slick.css";
import "@styles/slick/slick.theme.css";
import { useMemo } from "react";

const NewWrap = styled.div`
  width: 435px;
  margin-left: auto;
  display: flex;
  > i {
    width: 43px;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
    background-color: #d44040;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    padding: 0 5px;
    color: #fff;
    font-style: normal;
    margin-top: 3px;
  }
  > div {
    display: inline-block;
    width: calc(100% - 43px);
    padding-left: 6px;
    line-height: 18px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 21px;
    overflow: hidden;
    span {
      margin-top: 2px;
      font-size: 15px;
      color: #252525;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      cursor: pointer;
    }
  }
`;

const News = ({ news }: { news: KoscajNewsItem[] }) => {
  const option: Settings = useMemo(
    () => ({
      vertical: true,
      dots: false,
      accessibility: false,
      autoplay: true,
      arrows: false,
    }),
    []
  );
  return (
    <NewWrap>
      <i>NEWS</i>
      <Slider {...option}>
        {news.map(
          ({ title, link }, idx) => (
            <span key={`news-item-${idx}`}>
              <a href={link} target={"_blank"}>
                {title}
              </a>
            </span>
          ),
          []
        )}
      </Slider>
    </NewWrap>
  );
};

export default News;
