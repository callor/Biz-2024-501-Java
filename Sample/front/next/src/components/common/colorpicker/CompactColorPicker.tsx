import styled from "@emotion/styled";
import { forwardRef, ReactNode, useCallback, useRef, useState } from "react";
import { ColorChangeHandler, ColorResult, CompactPicker } from "react-color";

const Wrap = styled.span<{ isPrefix: boolean }>`
  position: relative;
  > input {
    padding-left: ${(props) => (props.isPrefix ? 28 : 13)}px;
  }
  > input + div {
    position: absolute !important;
    bottom: -100px;
    left: -40px;
    z-index: 9;
  }
`;
const Picker = styled(CompactPicker)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #999;
  border-radius: 4px;
`;

const CloseBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

interface ICompactColorPickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  colorPrefix?: ReactNode;
  color: string;
  onColorChange?: (color: ColorResult) => void;
}
const CompactColorPicker = (
  { color, onColorChange: _onColorChange, ...props }: ICompactColorPickerProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const pickerRef = useRef<CompactPicker>();

  const [isShow, setShow] = useState(false);

  const onFocus = useCallback(() => {
    setShow(true);
  }, []);

  const onColorChange = useCallback<ColorChangeHandler>(
    (color) => {
      if (_onColorChange) {
        _onColorChange(color);
      }
      setShow(false);
    },
    [_onColorChange]
  );

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Wrap isPrefix={props.colorPrefix ? true : false} onFocus={onFocus}>
      {props.colorPrefix && props.colorPrefix}
      <input {...props} ref={ref} autoComplete={"off"} />
      {isShow && (
        <>
          <Picker color={color} onChange={onColorChange} ref={pickerRef} />
          <CloseBackground onClick={onClose} />
        </>
      )}
    </Wrap>
  );
};

export default forwardRef(CompactColorPicker);
