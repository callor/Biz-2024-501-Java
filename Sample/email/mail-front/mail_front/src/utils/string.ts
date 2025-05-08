/**
 * @apiNote 문자열 유틸
 */
export const stringUtil = {
  moneyWithComma(money?: string | number) {
    if (!money && money === 0) {
      return "0";
    }
    if (money) {
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  dateWithDelimiter(date?: string, delimit?: string) {
    if (date) {
      if (!delimit) {
        delimit = ".";
      }

      let year = "";
      let month = "";
      let day = "";

      switch (date.length) {
        case 4:
          // (MMdd)
          month = date.substring(0, 2);
          day = date.substring(2, 4);
          return month + delimit + day;
        case 8:
          // (yyyyMMdd)
          year = date.substring(0, 4);
          month = date.substring(4, 6);
          day = date.substring(6, 8);
          return year + delimit + month + delimit + day;
        case 6:
          // (yyyyMM)
          year = date.substring(0, 4);
          month = date.substring(4, 6);
          return year + delimit + month;
      }
    }
  },
  // 조사 리턴
  choosePostPosition(string?: string, post1?: string, post2?: string) {
    if (string && post1 && post2) {
      const lastLetter = string.charCodeAt(string.length - 1);
      if ((lastLetter - 44032) % 28 === 0) {
        return post1;
      } else {
        return post2;
      }
    }
    return "";
  },
  // 주민번호 자동 하이픈 생성
  resinoAutoHyphen(string?: string) {
    if (string) {
      return string
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,6})(\d{0,7})$/g, "$1-$2")
        .replace(/-{1,2}$/g, "");
    }
  },
  // 주민번호 마스킹
  resinoAutoMasking(string?: string) {
    if (string) {
      return string.replace(/-/g, "").replace(/(\d{6})(\d{1})(\d{6})/, "$1-$2******");
    }
  },
  // 전화번호
  phoneNumber(phone?: string, delimiter?: string) {
    if (phone) {
      return phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1${delimiter ?? "-"}$2${delimiter ?? "-"}$3`);
    }
  },
  // 숫자만 리턴
  onlyNumber(string?: string) {
    return string?.replace(/[^0-9]/g, "");
  },
  // 문자열만 리턴
  onlyString(string?: string) {
    return string?.replace(/[^ㄱ-ㅎ가-힣]/g, "");
  },
};
