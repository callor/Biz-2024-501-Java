import { useCalendarStore } from '@components/common/context/RootStore';
import SettingLayout from '@components/layout/setting';
import styled from '@emotion/styled';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { axios, serverAxios } from '@utils/network.util';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const SettingItem = styled.dl`
  width: 100%;
  padding: 0 30px;
  padding-top: 20px;
  padding-bottom: 0;
  display: inline-flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  > dt {
    font-size: 18px;
    color: #868e96;
    font-weight: 350;
    margin-bottom: 10px;
  }
`;

// 기능 추가 예정
const SettingMainPage = ({
  setting,
}: {
  setting: { userId: string; holidayShow: YN; specialShow: YN; todoEndShow: YN };
}) => {
  const calendarStore = useCalendarStore();
  const { register, getValues } = useForm({ defaultValues: { isTodoEndShow: setting.todoEndShow === 'Y' } });

  const onTodoEndShowChange = useCallback(async () => {
    const { isTodoEndShow } = getValues();
    await axios.patch('/diary/setting/todoEndShow', { todoEndShow: isTodoEndShow ? 'Y' : 'N' });
    await flowResult(calendarStore.syncTodo());
  }, []);

  return (
    <SettingLayout>
      <SettingItem>
        <dt>일반 설정</dt>
        <dd>
          <article>
            <FormControlLabel
              control={
                <Checkbox
                  name="isTodoEndShow"
                  color={'primary'}
                  inputRef={register}
                  onChange={onTodoEndShowChange}
                  defaultChecked={setting.todoEndShow === 'Y'}
                />
              }
              label="완료된 할 일 보기"
            />
          </article>
        </dd>
      </SettingItem>
    </SettingLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: setting } = await serverAxios(ctx).get('/diary/setting');
  return { props: { setting } };
};

export default observer(SettingMainPage);
