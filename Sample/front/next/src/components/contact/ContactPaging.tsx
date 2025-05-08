import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useMemo } from "react";

const activeCss = css`
  a {
    color: #177efb;
    &:after {
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      content: "";
      display: block;
      width: 6px;
      border-bottom: 1px solid #177efb;
    }
  }
`;

const ContactPagingWrap = styled.div`
  text-align: center;
  padding-top: 5px;
`;

const PagingItem = styled.li<{ isActive?: boolean }>`
  display: inline-block;
  vertical-align: middle;

  a {
    position: relative;
    display: block;
    font-size: 14px;
    color: #a9a9a9;
    padding: 5px;
    letter-spacing: -0.02em;
    cursor: pointer;

    img {
      display: inline-block;
      vertical-align: bottom;
    }
  }

  ${(props) => props.isActive && activeCss}
`;

type ContactPagingProps = {
  total: number;
  page: number;
  onClick: (page: number) => void;
};

const ContactPaging = ({ total, page, onClick }: ContactPagingProps) => {
  const lastPage = useMemo(() => Math.ceil(total / 10), [total]);

  const pages = useMemo(() => {
    const pagings = [];
    const firstPage = page < 5 ? 1 : (page % 5) + 1;
    for (let i = firstPage; i <= lastPage && i < firstPage + 5; i++) {
      pagings.push(i);
    }
    return pagings;
  }, [page, lastPage]);

  const isBeforeButtons = useMemo(() => page > 5, [page]);
  const isAfterButtons = useMemo(() => pages[0] + 4 < lastPage, [
    pages[0],
    lastPage,
  ]);

  const onPageClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const page = Number(e.currentTarget.dataset.page);
    onClick(page);
  }, []);

  return (
    <ContactPagingWrap>
      <ul>
        {isBeforeButtons && (
          <>
            <PagingItem>
              <a data-page={1} onClick={onPageClick}>
                <img src="/images/btn/btn_pager_first.png" alt="처음으로" />
              </a>
            </PagingItem>
            <PagingItem>
              <a data-page={pages[0] - 1} onClick={onPageClick}>
                <img src="/images/btn/btn_pager_prev.png" alt="이전으로" />
              </a>
            </PagingItem>
          </>
        )}
        {pages.map((pagingNumber) => (
          <PagingItem
            key={`contact-paging-${pagingNumber}`}
            isActive={pagingNumber === page}
          >
            <a
              data-page={pagingNumber}
              onClick={page === pagingNumber ? () => {} : onPageClick}
            >
              {pagingNumber}
            </a>
          </PagingItem>
        ))}
        {isAfterButtons && (
          <>
            <PagingItem>
              <a data-page={pages[0] + 5} onClick={onPageClick}>
                <img src="/images/btn/btn_pager_next.png" alt="다음으로" />
              </a>
            </PagingItem>
            <PagingItem>
              <a data-page={lastPage} onClick={onPageClick}>
                <img src="/images/btn/btn_pager_last.png" alt="마지막으로" />
              </a>
            </PagingItem>
          </>
        )}
      </ul>
    </ContactPagingWrap>
  );
};

export default ContactPaging;
