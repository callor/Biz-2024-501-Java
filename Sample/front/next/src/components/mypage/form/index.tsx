import ButtonWrap from "@components/common/button/ButtonWrap";
import styled from "@emotion/styled";

export const InputBox = styled.div<{ hasButton?: boolean }>`
  > input {
    display: ${(props) => (props.hasButton ? "inline-block" : "block")};
    width: ${(props) => (props.hasButton ? "262px" : "100%")};
    height: 42px;
    border-radius: 5px;
  }

  > input + button {
    width: 128px;
    height: 42px;
    line-height: 40px;
    margin-left: 7px;
    border-radius: 5px;
    vertical-align: top;
  }
`;

export const FormWrap = styled.div`
  ${InputBox} + ${InputBox} {
    margin-top: 10px;
  }
  ${ButtonWrap} {
    margin-top: 30px;
  }
`;

export const CheckRow = styled.div`
  padding-top: 20px;
`;

export const FormConfrimButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

export const FormButtonBasic = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
`;

export const FormButtonBlue = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

export const RadioBox = styled.div`
  width: 100%;
  padding: 20px 22px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  text-align: left;
  box-sizing: border-box;
  > div + div {
    margin-top: 10px;
  }

  input[type="radio"] {
    display: none;
    width: 0;
    height: 0;

    + label {
      display: inline-block;
      font-size: 16px;
      font-weight: 350;
      color: ${({ theme }) => theme.colors.grey};
      padding-left: 34px;
      line-height: 24px;
      background: url("/images/btn/btn_radio_off.png") left center no-repeat;
      cursor: pointer;
    }
    &:checked + label {
      background: url("/images/btn/btn_radio_on.png") left center no-repeat;
    }
  }
`;
