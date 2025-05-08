import { BlueButton } from '@components/common/button';
import { FormButtonBasic } from '@components/mypage/form';
import styled from '@emotion/styled';
import { axios } from '@utils/network.util';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

//#region
const TipDetailWrap = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  position: absolute;
  top: 80px;
  right: ${({ isShow }) => (isShow ? 0 : -500)}px;
  height: 100%;
  width: 450px !important;
  transition: all 0.3s ease;
  z-index: 9;
`;

const DetailTop = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  background-color: #454545;
  text-align: center;
  > button {
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    background: url('/images/btn/btn_Arrow.png') center no-repeat;
  }
  p {
    line-height: 48px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const DetailMain = styled.div`
  width: 100%;
  height: calc(100% - 108px);
  background-color: ${({ theme }) => theme.colors.white};
  border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  > div {
    padding: 16px 20px;
    background-color: #fafafa;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    height: 100%;
    .month {
      font-size: 18px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black};
    }
    .time {
      color: #454545;
      margin-top: 7px;
    }
    button {
      width: 60px;
      height: 24px;
      border-radius: 2px;
      font-size: 12px;
      + button {
        margin-left: 7px;
      }
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
`;

const BetweenBox = styled(FlexBox)`
  justify-content: space-between;
  > div:firt-of-type {
    flex: 1;
  }
  > div:last-of-type {
    width: 127px;
  }
`;

const TipBox = styled.div`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  width: 100%;
  height: 90%;
  > iframe {
    width: 100%;
    /* height: 100%; */
  }
`;
//#endregion

const TipDetail = ({ tipId, month, note, isShow }: TipDetailProps) => {
  const [tipDetail, setTipDetail] = useState<Tip>(undefined);
  const router = useRouter();

  const onDetailViewClick = useCallback(() => {
    setTipDetail(undefined);
  }, []);

  useEffect(() => {
    setTipDetail({ tipId, month, note });
  }, [tipId]);

  const onDeleteClick = useCallback(async () => {
    if (tipId !== undefined) {
      if (confirm('삭제하시겠습니까?')) {
        await axios.delete(`diary/tip/${tipId}`);
        alert('삭제되었습니다.');
        router.reload();
      }
    }
  }, [tipId]);

  const onModifyClick = useCallback(() => {
    if (tipId !== undefined) {
      router.push(`/admin/tip/write?tipId=${tipId}`);
    } else {
      alert('실패');
    }
  }, [tipId]);

  return (
    <TipDetailWrap isShow={isShow}>
      {tipDetail && (
        <>
          <DetailTop>
            <button onClick={onDetailViewClick} />
            <p>업무팁 상세내용</p>
          </DetailTop>
          <DetailMain>
            <div>
              <BetweenBox>
                <div>
                  <p className="month">{month}</p>
                </div>
                <div>
                  <BlueButton onClick={onModifyClick}>수정</BlueButton>
                  <FormButtonBasic onClick={onDeleteClick}>삭제</FormButtonBasic>
                </div>
              </BetweenBox>
              <TipBox>
                <iframe
                  srcDoc={`
                  <!doctype html>
                  <html lang="utf-8">
                  <head>
                    <meta charset="utf-8">
                    <link href="//cdn.quilljs.com/1.2.6/quill.snow.css?1=1" rel="stylesheet"> 
                  </head>
                  <body>
                    <div class="ql-editor">${note}</div>
                  </body>
                  </html>`}
                />
              </TipBox>
            </div>
          </DetailMain>
        </>
      )}
    </TipDetailWrap>
  );
};

export default TipDetail;

type TipDetailProps = {
  tipId: string;
  month: number;
  note: string;
  isShow: boolean;
};
