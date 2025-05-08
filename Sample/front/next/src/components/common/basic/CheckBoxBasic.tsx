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
      background: url("${({ theme }) => theme.images.checkboxNo}") left center
        no-repeat;
      cursor: pointer;
    }
    &:checked + label {
      background: url("${({ theme }) => theme.images.checkboxYes}") left center
        no-repeat;
    }
  }
`;
