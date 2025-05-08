import { Box } from "@mui/material";
import { ICommonPicker } from "./CommonDatePicker.type";
import DateMonoPicker from "./date/monopicker/MonoPicker";
import DateRangePicker from "./date/rangepicker/RangePicker";
import MonthMonoPicker from "./month/monopicker/MonoPicker";
import MonthRangePicker from "./month/rangePicker/RangePicker";

/**
 * @apiNote 데이트피커 컴포넌트
 */
const today = new Date();

const CommonDatePicker = ({
  width,
  mode, // date | month | skeleton
  range, // true / false
  monoDate,
  changeMonoDate,
  startDate,
  changeStartDate,
  endDate,
  changeEndDate,
  paddingY,
  fontSize,
  minDate,
  maxDate,
  delimiter,
  showRangeMacroButtons,
  disabled,
  svgSize,
  direction = { vertical: "bottom", horizontal: "left" },
  directionAfter,
  closePopover,
  viewStartDate,
  viewEndDate,
}: ICommonPicker) => {
  return (
    <div style={{ display: "inline-block", marginRight: 10 }}>
      <Box
        sx={{
          "> span": { margin: "0 5px" },
          display: "flex",
          alignItems: "center",
          width: width + "px",
        }}
      >
        {mode === "date" &&
          (range ? (
            <DateRangePicker
              paddingY={paddingY}
              fontSize={fontSize}
              width={width}
              startDate={startDate ?? today}
              changeStartDate={(date: Date) => changeStartDate?.(date)}
              endDate={endDate ?? today}
              changeEndDate={(date: Date) => changeEndDate?.(date)}
              minDate={minDate}
              maxDate={maxDate}
              delimiter={delimiter}
              showRangeMacroButtons={showRangeMacroButtons}
              disabled={disabled}
              svgSize={svgSize}
              direction={direction}
              directionAfter={directionAfter}
              closePopover={closePopover}
              // 241010 추가
              viewStartDate={viewStartDate}
              viewEndDate={viewEndDate}
            />
          ) : (
            <DateMonoPicker
              paddingY={paddingY}
              fontSize={fontSize}
              width={width}
              monoDate={monoDate ?? today}
              changeMonoDate={(date: Date) => changeMonoDate?.(date)}
              minDate={minDate}
              maxDate={maxDate}
              delimiter={delimiter}
              disabled={disabled}
              svgSize={svgSize}
              direction={direction}
              directionAfter={directionAfter}
            />
          ))}
        {mode === "month" &&
          (range ? (
            <MonthRangePicker
              paddingY={paddingY}
              fontSize={fontSize}
              width={width}
              startDate={startDate ?? today}
              changeStartDate={(date: Date) => changeStartDate?.(date)}
              endDate={endDate ?? today}
              changeEndDate={(date: Date) => changeEndDate?.(date)}
              minDate={minDate}
              maxDate={maxDate}
              delimiter={delimiter}
              disabled={disabled}
              svgSize={svgSize}
              direction={direction}
              directionAfter={directionAfter}
            />
          ) : (
            <MonthMonoPicker
              paddingY={paddingY}
              fontSize={fontSize}
              width={width}
              monoDate={monoDate ?? today}
              changeMonoDate={(date: Date) => changeMonoDate?.(date)}
              minDate={minDate}
              maxDate={maxDate}
              delimiter={delimiter}
              disabled={disabled}
              svgSize={svgSize}
              direction={direction}
              directionAfter={directionAfter}
            />
          ))}
        {mode === "skeleton" && (
          <MonthMonoPicker
            paddingY={paddingY}
            fontSize={fontSize}
            width={width}
            monoDate={monoDate ?? today}
            changeMonoDate={(date: Date) => changeMonoDate?.(date)}
            minDate={minDate}
            maxDate={maxDate}
            delimiter={delimiter}
            disabled={true}
            svgSize={svgSize}
            direction={direction}
            directionAfter={directionAfter}
          />
        )}
      </Box>
    </div>
  );
};
export default CommonDatePicker;
