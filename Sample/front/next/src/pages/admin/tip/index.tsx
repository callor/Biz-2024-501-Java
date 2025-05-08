import AdminPageLayout from '@components/layout/admin';
import TipDetail from '@components/tip/Detail';
import TipItem from '@components/tip/TipItem';
import styled from '@emotion/styled';
import { axios } from '@utils/network.util';
import { runInAction } from 'mobx';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

//#region styled
const ButtonWrap = styled.div`
  width: 100%;
  height: 56px;
  padding: 10px 20px 14px;
  background-color: #fafafa;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  button {
    width: 80px;
    height: 32px;
    border-radius: 2px;
    font-size: 14px;
  }
`;

const AddBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const RemoveBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  color: ${({ theme }) => theme.colors.borderBlack};
  margin-left: 7px;
`;

const TipTable = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-top: 1px solid ${({ theme }) => theme.colors.borderBlack};
  box-sizing: border-box;
  > table {
    width: 100%;
    table-layout: fixed;
    > thead {
      background: #fafafa;
      border-bottom: 1px solid #eeeeee;
      box-sizing: border-box;
      th {
        line-height: 42px;
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
        border-bottom: 1px solid #eeeeee;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;

const TipListTable = styled.div`
  height: calc(100% - 44px);
  overflow-y: auto;
  table {
    width: 100%;
    table-layout: fixed;
    tbody {
      tr {
        height: 46px;
        border-bottom: 1px solid #eeeeee;
      }
      td {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.borderBlack};
        border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
        padding: 10px;
        text-align: center;
        &:nth-of-type(3) {
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;
//#endregion

const AdminTipPage = () => {
  const [tipList, setTipList] = useState<Tip[]>([]);
  const [detailId, setDetailId] = useState<string>();
  const [detailMonth, setDetailMonth] = useState<number>();
  const [detailNote, setDetailNote] = useState<string>();

  const onDeleteClick = useCallback(async () => {
    const tipIdChecked = document.querySelectorAll<HTMLInputElement>('.tip_id:checked');
    const tipIds: string[] = [];
    tipIdChecked.forEach((tipId) => {
      tipIds.push(tipId.value);
    });
    if (tipIds.length > 0) {
      switch (tipIds.length) {
        case 1:
          await axios.delete(`diary/tip/${tipIds}`);
          break;
        default:
          await axios.post('/diary/tip/delete', { tipIds });
      }
      alert('삭제되었습니다.');
      setTipList([]);
      getTipList();
    } else {
      alert('삭제하실 목록을 선택해주세요.');
    }
  }, []);

  const getTipList = useCallback(async () => {
    const { data: tips } = await axios.get(`/diary/tip`);
    setTipList(tips);
  }, []);

  useEffect(() => {
    getTipList();
  }, []);

  const onClickNote = useCallback((tipId: string, month: number, note: string) => {
    try {
      runInAction(() => {
        setDetailId(tipId);
        setDetailMonth(month);
        setDetailNote(note);
      });
    } catch (error) {}
  }, []);

  const TipItemList = useMemo(
    () => tipList.map((tip) => <TipItem tip={tip} onNoteClick={onClickNote} key={`tip-item-key-${tip.tipId}`} />),
    [tipList],
  );

  return (
    <AdminPageLayout>
      <ButtonWrap>
        <div></div>
        <ButtonBox>
          <Link href="/admin/tip/write">
            <AddBtn type="button">추가</AddBtn>
          </Link>
          <RemoveBtn type="button" onClick={onDeleteClick}>
            제거
          </RemoveBtn>
        </ButtonBox>
      </ButtonWrap>
      <TipTable>
        <table>
          <colgroup>
            <col width="5%"></col>
            <col width="15%"></col>
            <col width="*"></col>
            <col width="15%"></col>
            <col width="15%"></col>
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>년/월</th>
              <th>내용</th>
              <th>등록일</th>
              <th>수정일</th>
            </tr>
          </thead>
        </table>
        <TipListTable>
          <table>
            <colgroup>
              <col width="5%"></col>
              <col width="15%"></col>
              <col width="*"></col>
              <col width="15%"></col>
              <col width="15%"></col>
            </colgroup>
            <tbody>{TipItemList}</tbody>
          </table>
        </TipListTable>
      </TipTable>
      <TipDetail tipId={detailId} month={detailMonth} note={detailNote} isShow={detailId != undefined ? true : false} />
    </AdminPageLayout>
  );
};
export default AdminTipPage;
