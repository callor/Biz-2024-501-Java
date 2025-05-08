import ButtonWrap from '@components/common/button/ButtonWrap';
import Editor from '@components/common/editor/EditorComponent';
import AdminPageLayout from '@components/layout/admin';
import styled from '@emotion/styled';
import { axios, serverAxios } from '@utils/network.util';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

//#region
const TitleWrap = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px 20px 14px;
  background-color: #fafafa;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  > p {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
    line-height: 26px;
  }
`;

const TipFormTable = styled.div`
  width: calc(100%-30px);
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  table {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    tr {
      border-bottom: 1px solid #eeeeee;
      &:nth-of-type(1) {
        border-top: 1px solid ${({ theme }) => theme.colors.borderBlack};
      }
      th {
        width: 150px;
        background-color: #fafafa;
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        text-align: left;
      }
      td {
        padding: 10px 20px;
        box-sizing: border-box;
      }
    }
  }
  input,
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    resize: none;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.borderBlack};
  }
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    box-sizing: border-box;
  }
  input::placeholder {
    font-size: 14px;
    color: #999;
  }
  input {
    height: 36px;
  }

  ${ButtonWrap} {
    text-align: center;
    padding: 18px 0;
    box-sizing: border-box;
    > button {
      width: 80px;
      height: 32px;
      color: #fff;
      background-color: #177efb;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
      + button {
        margin-left: 10px;
        background-color: #fff;
        color: #333;
        border: 1px solid #757575;
      }
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  padding-left: 10px;
  margin-top: 5px;
`;
//#endregion

const TipWritePage = ({ tipId, defaultValues }: TipWritePageProps) => {
  const router = useRouter();
  const [note, setNote] = useState<string>('');

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    if (tipId) {
      setNote(defaultValues.note);
    }
  }, []);

  const onSubmitData = useCallback(
    handleSubmit(async ({ ...formData }) => {
      if (!tipId) {
        // 등록
        await axios.post('/diary/tip', {
          month: Number(formData.month),
          note: formData.note,
        });
        alert('저장되었습니다.');
      } else {
        // 수정
        await axios.put('/diary/tip', {
          tipId: tipId,
          month: Number(formData.month),
          note: formData.note,
        });
        alert('수정되었습니다.');
      }
      router.replace('/admin/tip');
    }),
    [handleSubmit],
  );

  const onCreateData = useCallback((note: string) => {
    setNote(note);
  }, []);

  return (
    <AdminPageLayout>
      <TitleWrap>
        <p>업무팁추가</p>
      </TitleWrap>
      <TipFormTable>
        <form>
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <th>년월</th>
                  <td>
                    <input type="hidden" name="tipId" value={tipId} />
                    <input
                      type="number"
                      ref={register({
                        required: {
                          value: true,
                          message: '등록할 년월을 yyyyMM 형식으로 입력하세요.',
                        },
                        maxLength: {
                          value: 6,
                          message: '등록할 년월을 yyyyMM 형식으로 입력하세요.',
                        },
                        pattern: {
                          value: /[0-9]{6}/,
                          message: '6자리 숫자만 입력 가능합니다.',
                        },
                      })}
                      name="month"
                      placeholder="yyyyMM"
                    />
                    {errors?.month && <ErrorMessage>{errors.month.message}</ErrorMessage>}
                  </td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td>
                    <input
                      type="hidden"
                      name="note"
                      value={note}
                      ref={register({
                        required: {
                          value: true,
                          message: '업무팁 내용을 입력하세요.',
                        },
                      })}
                      readOnly
                    />
                    <Editor onCreateData={onCreateData} name={note} />

                    {errors?.note && <ErrorMessage>{errors.note.message}</ErrorMessage>}
                  </td>
                </tr>
              </tbody>
            </table>
            <ButtonWrap>
              <button onClick={onSubmitData}>저장</button>
              <Link href={'/admin/tip'}>
                <button>취소</button>
              </Link>
            </ButtonWrap>
          </fieldset>
        </form>
      </TipFormTable>
    </AdminPageLayout>
  );
};

export default TipWritePage;

type TipDetail = {
  tipId: string;
  month: number;
  note: string;
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let defaultValues: DefaultValues = {
    month: null,
    note: '',
  };
  const { tipId } = ctx.query as {
    tipId: string;
  };

  if (tipId) {
    const { data: tip } = await serverAxios(ctx).get<TipDetail>(`/diary/tip/detail/${tipId}`);
    defaultValues = {
      ...tip,
    };
  }

  return {
    props: {
      tipId: tipId ?? null,
      defaultValues,
    },
  };
};
type TipWritePageProps = {
  tipId?: string;
  defaultValues: DefaultValues;
};
type DefaultValues = {
  month: number;
  note: string;
};
