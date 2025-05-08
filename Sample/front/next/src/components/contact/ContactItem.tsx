import styled from "@emotion/styled";
import useToggle from "@hooks/useToggle";
import { useCallback, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

//#region styled
const Name = styled.td`
  color: #454545;
  font-weight: bold;
  letter-spacing: -0.04em;
`;

const Phone = styled.td`
  text-align: left;
`;

const Check = styled.td`
  border-left: none !important;
  input[type="checkbox"] {
    display: none;
    + label {
      display: inline-block;
      width: 14px;
      height: 14px;
      padding: 0;
      margin: 0;
      border: 1px solid ${({ theme }) => theme.colors.borderLight};
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
    }

    &:checked + label {
      background: url("${({ theme }) => theme.icons.checkbox}") center no-repeat;
    }
  }
`;

const Mark = styled.td`
  input[type="checkbox"] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("${({ theme }) => theme.icons.starOff}") center no-repeat;
    }
    &:checked + label {
      background: url("${({ theme }) => theme.icons.starOn}") center no-repeat;
    }
  }
`;
const Input = styled.input<{ isShow: boolean }>`
  width: 100%;
  font-size: 12px;
  ${(props) => !props.isShow && "display: none;"}
`;

const MemoWrap = styled.tr`
  background-color: #fafafa;
  > td {
    padding: 8px 0 !important;
    border-left: none !important;
    &:last-of-type {
    }
  }
  textarea {
    width: 420px;
    height: 72px;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    line-height: 1.6;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    float: left;
  }
  button {
    width: 80px;
    height: 72px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.white};

    + button {
      margin-left: 10px;
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.black};
      border: 1px solid ${({ theme }) => theme.colors.grey};
    }
  }
`;

const ModifyBox = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  > button {
    width: 18px;
    height: 18px;
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-radius: 5px;
    background-size: auto;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
const Email = styled.td`
  text-align: left;
  ${Input} {
    width: 125px;
  }
`;
const AddButton = styled.button`
  margin-left: 3px;
  background-image: url("${({ theme }) => theme.icons.plus}");
`;

const MinusButton = styled.button`
  background-image: url("${({ theme }) => theme.icons.minus}");
`;
//#endregion
interface ContactItemProps extends Contact {
  onSaveClick: (contact: Contact) => void;
  onCancelClick: (contact: Contact) => void;
}

const ContactItem = ({
  name,
  favorYn,
  telId,
  memo,
  infos,
  onSaveClick: _onSaveClick,
  onCancelClick,
}: ContactItemProps) => {
  const [isShow, showToggle] = useToggle(!telId);

  const { register, control, reset, getValues } = useForm({
    defaultValues: {
      favorYn: favorYn === "Y" ? "Y" : "",
      name,
      memo,
      infos: infos.map(({ tel, fax, email }) => ({ tel, fax, email })),
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "infos" });

  const onResetClick = useCallback(async () => {
    if (telId) {
      reset();
      showToggle();
    } else {
      onCancelClick({ name, favorYn, telId, memo, infos });
    }
  }, [isShow]);

  const onSaveClick = useCallback(() => {
    const { name, favorYn, infos, memo } = getValues();
    if (!name?.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    const filterInfos = infos?.filter(
      ({ tel, fax, email }) => tel?.trim() || fax?.trim() || email?.trim()
    );

    if (filterInfos?.length < 1) {
      alert("연락처 정보가 한건이라도 있어야 저장가능합니다.");
      return;
    }
    _onSaveClick({
      telId,
      name,
      memo,
      favorYn: favorYn ? "Y" : "N",
      infos: filterInfos.map((info, idx) => ({
        ...info,
        orded: idx,
      })),
    });
    showToggle();
  }, [isShow]);

  const checkBoxRef = useRef<HTMLInputElement>();

  const checkContact = useCallback(
    (e: React.MouseEvent) => {
      checkBoxRef.current.checked = !checkBoxRef.current.checked;
      e.stopPropagation();
    },
    [checkBoxRef]
  );

  return (
    fields.length > 0 && (
      <>
        {fields.map((field, idx) => (
          <tr
            onClick={!isShow ? showToggle : () => {}}
            key={`contact-infos-${idx}-${telId}`}
          >
            {idx === 0 && (
              <>
                <Check rowSpan={fields.length}>
                  <input
                    ref={checkBoxRef}
                    type="checkbox"
                    value={telId}
                    className={"contact_tel_id"}
                  />
                  <label onClick={checkContact}></label>
                </Check>
                <Mark rowSpan={fields.length}>
                  <input
                    type="checkbox"
                    id={`${telId}-favor`}
                    name="favorYn"
                    ref={register}
                  />
                  <label htmlFor={`${telId}-favor`}></label>
                </Mark>
                <Name rowSpan={fields.length}>
                  {!isShow && name}
                  <Input isShow={isShow} name="name" ref={register} />
                </Name>
              </>
            )}
            <Phone>
              {!isShow && field.tel}
              <Input
                isShow={isShow}
                name={`infos[${idx}].tel`}
                ref={register()}
                defaultValue={fields[idx].tel}
              />
            </Phone>
            <td>
              {!isShow && field.fax}
              <Input
                isShow={isShow}
                name={`infos[${idx}].fax`}
                ref={register()}
                defaultValue={fields[idx].fax}
              />
            </td>
            <Email>
              {!isShow && field.email}
              <Input
                isShow={isShow}
                name={`infos[${idx}].email`}
                ref={register()}
                defaultValue={fields[idx].email}
              />
              {isShow && (
                <ModifyBox>
                  <MinusButton
                    onClick={() => {
                      if (fields.length == 1) {
                        alert("최소 1개의 연락처를 등록해야합니다.");
                      } else {
                        remove(idx);
                      }
                    }}
                  />
                  {idx + 1 === fields.length && (
                    <AddButton
                      onClick={() => {
                        if (fields.length < 10) {
                          append({ tel: "", fax: "", email: "" });
                        } else {
                          alert("최대 10개까지 등록가능합니다.");
                        }
                      }}
                    />
                  )}
                </ModifyBox>
              )}
            </Email>
          </tr>
        ))}
        {isShow && (
          <MemoWrap>
            <td colSpan={6}>
              <textarea ref={register} name="memo"></textarea>
              <button onClick={onSaveClick}>저장</button>
              <button onClick={onResetClick}>취소</button>
            </td>
          </MemoWrap>
        )}
      </>
    )
  );
};

export default ContactItem;
