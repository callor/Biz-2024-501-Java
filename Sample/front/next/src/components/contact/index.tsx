import styled from "@emotion/styled";
import { axios } from "@utils/network.util";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ContactItem from "./ContactItem";
import ContactPaging from "./ContactPaging";

//#region styled
const ContactPopWrap = styled.div`
  position: absolute;
  width: 660px;
  height: 620px;
  top: 50px;
  right: 30px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.27);
  border-radius: 10px;
  overflow: hidden;
  z-index: 9;
`;

const PopTop = styled.div`
  position: relative;
  background-color: #454545;
  padding: 0 19px;
  box-sizing: border-box;
  > p {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
    line-height: 62px;
  }
  > button {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: url("/images/btn/btn_close_white_16x16.png") center no-repeat;
  }
`;
const InputWrap = styled.div``;

const RefreshButton = styled.button`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.white}
    url("/images/btn/btn_reset.png") center no-repeat;
  background-size: 18px 21px;
  margin-left: 7px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 5px;
  overflow: hidden;
  vertical-align: top;
`;

const SearchWrap = styled.div`
  width: 100%;
  height: 56px;
  padding: 10px 20px 14px;
  background-color: #f9f9f9;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  justify-content: space-between;
  ${InputWrap} {
    display: inline-block;
    position: relative;

    input {
      height: 32px;
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme.colors.borderLight};

      + button {
        position: absolute;
        top: 0;
        right: 3px;
        width: 32px;
        height: 32px;
        background: url("/images/ico/ico_search_black_18x18.png") center
          no-repeat;
        background-size: 18px;
      }
    }
  }
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
const RemoveButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  color: #454545;
  margin-left: 7px;
`;

const ContactWrap = styled.div`
  padding-top: 10px;
  box-sizing: border-box;
`;
const ContactListWrap = styled.div`
  position: relative;
  height: 440px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow-y: auto;
  table {
    width: 100%;
    position: relative;
    text-align: center;
    table-layout: fixed;
    margin: 0 auto;

    &:after {
      position: absolute;
      content: "";
      display: block;
      width: 100%;
      top: 0;
      border-top: 1px solid #454545;
      z-index: 1;
    }

    tr {
      border-bottom: 1px solid #eee;
    }

    thead th {
      height: 35px;
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black};
      background-color: #fafafa;
      border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
      box-sizing: border-box;
      &:first-of-type {
        border-left: none;
      }

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
          background: url("/images/ico/ico_checked.png") center no-repeat;
        }
      }
    }
    tbody td {
      position: relative;
      font-family: "dotum", tahoma, "MalgunGothic", "Verdana", "Arial",
        "Helvetica", sans-serif;
      font-size: 12px;
      color: #454545;
      letter-spacing: 0;
      height: 30px;
      padding: 0px 5px;
      border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
      box-sizing: border-box;
    }
  }
`;
//#endregion

const ContactPopupContainer = ({ isShow = false, onClose = () => {} }) => {
  const [pagingData, setPagingData] = useState({ page: 0, total: 0 });
  const [contactList, setContactList] = useState<Contact[]>([]);
  const searchRef = useRef<HTMLInputElement>();

  const getContactData = useCallback(async (page = 1, name = "") => {
    const {
      data: { page: currentPage, total, contacts },
    } = await axios.get<{
      page: number;
      total: number;
      contacts: Contact[];
    }>(`/contact/${page}${name ? `?name=${name}` : ""}`);
    setPagingData({ page: currentPage, total });
    setContactList(contacts);
  }, []);

  useEffect(() => {
    getContactData(1);
  }, []);

  const onAddClick = useCallback(() => {
    if (
      contactList.findIndex(({ telId }) => typeof telId === "undefined") > -1
    ) {
      alert("현재 추가 진행 중입니다.");
      return;
    }
    setContactList([
      { favorYn: "N", name: "", memo: "", infos: [{ orded: 0 }] },
      ...contactList,
    ]);
  }, [contactList]);

  const onSaveClick = useCallback(async (contact: Contact) => {
    if (!contact.telId) {
      await axios.post("/contact", contact);
    } else {
      await axios.put("/contact", contact);
    }
    alert("저장되었습니다.");
    setContactList([]);
    getContactData(1);
  }, []);

  const onCancelClick = useCallback(
    (contact: Contact) => {
      if (!contact.telId) {
        setContactList([...contactList].splice(1));
      }
    },
    [contactList]
  );

  const onDeleteClick = useCallback(async () => {
    const telIdChecks = document.querySelectorAll<HTMLInputElement>(
      ".contact_tel_id:checked"
    );
    const telIds: string[] = [];
    telIdChecks.forEach((telId) => {
      telIds.push(telId.value);
    });
    if (telIds.length > 0) {
      await axios.post("/contact/delete", { telIds });
      alert("삭제되었습니다.");
      setContactList([]);
      getContactData(1);
    } else {
      alert("삭제하실 목록을 선택 해 주세요.");
    }
  }, []);

  const onSearchClick = useCallback(() => {
    const name = searchRef.current.value.trim();
    if (!name) {
      alert("검색하실 이름을 입력해주세요.");
      return;
    }
    getContactData(1, name);
  }, [searchRef]);

  const onRefreshClick = useCallback(() => {
    searchRef.current.value = "";
    getContactData(1);
  }, [searchRef]);

  const allCheckEvent = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    const telIdChecks = document.querySelectorAll<HTMLInputElement>(
      ".contact_tel_id"
    );
    telIdChecks.forEach(
      (telIdCheck) => (telIdCheck.checked = e.currentTarget.checked)
    );
  }, []);

  const movePageClick = useCallback(
    (page: number) => {
      const name = searchRef.current.value.trim();
      getContactData(page, name ? name : null);
    },
    [searchRef]
  );

  const ContactItemList = useMemo(
    () =>
      contactList.map((contact) => (
        <ContactItem
          {...contact}
          key={`contact-item-key-${contact.telId}`}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
        />
      )),
    [contactList]
  );

  return (
    isShow && (
      <ContactPopWrap>
        <div>
          <PopTop>
            <p>연락처 관리</p>
            <button type="button" onClick={onClose}></button>
          </PopTop>
          <div>
            <SearchWrap>
              <div>
                <InputWrap>
                  <input
                    type="text"
                    ref={searchRef}
                    placeholder={"이름 검색"}
                  />
                  <button type="button" onClick={onSearchClick} />
                </InputWrap>
                <RefreshButton onClick={onRefreshClick} />
              </div>
              <ButtonBox>
                <AddBtn type="button" onClick={onAddClick}>
                  추가
                </AddBtn>
                <RemoveButton type="button" onClick={onDeleteClick}>
                  제거
                </RemoveButton>
              </ButtonBox>
            </SearchWrap>
          </div>
          <ContactWrap>
            <ContactListWrap>
              <table>
                <colgroup>
                  <col width="30px" />
                  <col width="30px" />
                  <col width="120px" />
                  <col width="120px" />
                  <col width="120px" />
                  <col width="*" />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        id="checkAll"
                        onClick={allCheckEvent}
                      />
                      <label htmlFor="checkAll"></label>
                    </th>
                    <th></th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>팩스</th>
                    <th>이메일</th>
                  </tr>
                </thead>
                <tbody>{ContactItemList}</tbody>
              </table>
            </ContactListWrap>
            <ContactPaging
              page={pagingData.page}
              total={pagingData.total}
              onClick={movePageClick}
            />
          </ContactWrap>
        </div>
      </ContactPopWrap>
    )
  );
};

export default ContactPopupContainer;
