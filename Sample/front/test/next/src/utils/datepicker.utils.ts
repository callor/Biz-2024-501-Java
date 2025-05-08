import DateFnsUtils from "@date-io/date-fns";
import { DateUtil } from "./date.util";
export class LocalizedDateUtils extends DateFnsUtils {
  dateFormat = "yyyy-MM-dd";

  getDatePickerHeaderText(date: Date) {
    return DateUtil.format(date, "yyyy-MM-dd");
  }

  getCalendarHeaderText(date: Date) {
    return DateUtil.format(date, "yyyy년 MM월");
  }
}
