import styled from '@emotion/styled';
import { DateUtil } from '@utils/date.util';
import { StringUtil } from '@utils/string.util';
import { useCallback, useRef } from 'react';

const Check = styled.td`
  border-left: none !important;
  input[type='checkbox'] {
    display: none;
    + label {
      display: inline-block;
      width: 14px;
      height: 14px;
      padding: 0px;
      margin: 0px;
      border: 1px solid #dbdbdb;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
    }
    &:checked + label {
      background: url('${({ theme }) => theme.icons.checkbox}') center no-repeat;
    }
  }
`;

const TipItem = ({
  tip,
  onNoteClick,
}: {
  tip: Tip;
  onNoteClick: (tipId: string, month: number, note: string) => void;
}) => {
  const checkBoxRef = useRef<HTMLInputElement>();
  const checkTip = useCallback(
    (e: React.MouseEvent) => {
      checkBoxRef.current.checked = !checkBoxRef.current.checked;
      e.stopPropagation();
    },
    [checkBoxRef],
  );

  return (
    <>
      <tr>
        <Check>
          <input type="checkbox" ref={checkBoxRef} name="tipId" value={tip.tipId} className={'tip_id'} />
          <label onClick={checkTip}></label>
        </Check>
        <td>{tip.month}</td>
        <td
          onClick={() => {
            onNoteClick(tip.tipId, tip.month, tip.note);
          }}
        >
          {StringUtil.removeHTML(tip.note)}
        </td>
        <td>{tip.retdt && DateUtil.format(tip.retdt, 'yyyy.MM.dd(iii)')}</td>
        <td>{tip.uptdt && DateUtil.format(tip.uptdt, 'yyyy.MM.dd(iii)')}</td>
      </tr>
    </>
  );
};

export default TipItem;
