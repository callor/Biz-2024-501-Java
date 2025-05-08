const theme = {
  colors: {
    white: '#ffffff',
    primary: '#177efb',
    black: '#252525',
    grey: '#757575',
    borderBlack: '#454545',
    borderLight: '#dbdbdb',
  },
  images: {
    checkboxNo: '/images/btn/btn_checkbox_no.png',
    checkboxYes: '/images/btn/btn_checkbox_yes.png',
    bannerClose: '/images/btn/btn_close_20x20.png',
  },
  icons: {
    checkbox: '/images/ico/ico_checked.png',
    starOn: '/images/ico/ico_star_on.png',
    starOff: '/images/ico/ico_star_off.png',
    callOff: '/images/ico/ico_call.png',
    callOn: '/images/ico/ico_call_on.png',
    myPageOff: '/images/ico/ico_mypage.png',
    myPageOn: '/images/ico/ico_mypage_on.png',
    settingOff: '/images/ico/ico_setting.png',
    settingOn: '/images/ico/ico_setting_on.png',
    alrmOff: '/images/ico/ico_alarm.png',
    alrmOn: '/images/ico/ico_alarm_on.png',
    plus: '/images/ico/ico_plus.png',
    minus: '/images/ico/ico_minus.png',
  },
};

type ColorTheme = typeof theme;
declare module '@emotion/react' {
  export interface Theme extends ColorTheme {}
}

export default theme;
