import React, { HTMLAttributes, useEffect, useState } from "react";
import { DateUtil } from "@utils/date.util";

interface IClock extends HTMLAttributes<HTMLSpanElement> {
  format?: string;
}

const Clock = ({ format = "yyyy.MM.dd HH:mm:ss", ...props }: IClock) => {
  const [now, setNow] = useState<Date>();
  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return <span {...props}>{now && DateUtil.format(now, format)}</span>;
};

export default Clock;
