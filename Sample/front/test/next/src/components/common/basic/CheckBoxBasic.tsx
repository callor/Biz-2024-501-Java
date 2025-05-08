import styled from "@emotion/styled";

export const CheckBoxBasic = styled.div`
  > input[type="checkbox"] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      font-weight: 350;
      padding-left: 21px;
      background: url("/images/btn/btn_checkbox_no.png") left center no-repeat;
      cursor: pointer;
    }
    &:checked + label {
      background: url("/images/btn/btn_checkbox_yes.png") left center no-repeat;
    }
  }
`;
