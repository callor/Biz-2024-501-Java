import { useAtom } from "jotai";
import * as React from "react";
import { useCallback, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

import { mainSearchSmunionCd } from "./main/Main.atom";

// 로그아웃
import { getUserDetail } from "@/module/user/user";
import { cookieUtil } from "@/utils/cookie";
import { useRouter } from "next/router";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
// const navItems = ["Home", "About", "Contact"];

export default function Header(props: Props) {
  const [open, setOpen] = useState(false);
  const [memo, setMemo] = useState();
  const [memoIdx, setMemoIdx] = useState<number>();

  const { userInfo } = getUserDetail();
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [searchSmunionCd, setSearchSmunionCd] = useAtom(mainSearchSmunionCd);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const parseLines = (value: any) => {
    if (value) {
      return value.replace(/(\\n)/g, "\n");
    }
  };

  /**
   * 메일 전송 페이지
   */
  const goWrite = () => {
    router.push(`/write`);
  };

  /**
   * 템플릿 목록 페이지
   */
  const goList = () => {
    router.push(`/templateList`);
  };

  /**
   * 로그아웃버튼 클릭 이벤트
   */
  const handdleLogout = useCallback(() => {
    if (confirm("로그아웃 하시겠습니까?")) {
      cookieUtil.removeCookie("_sd");
      sessionStorage.clear(); // FIXME: 하나하나 삭제해주기
      router.push("/", undefined, { shallow: true });
    }
  }, [router]);

  const drawer = (
    <>
      <Link rel="icon" href="favicon.ico" />
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          ✉️메일보관함
        </Typography>
        <Divider />
        <List>
          {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
          <ListItem key="LOGOUT" disablePadding onClick={handdleLogout}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="LOGOUT" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="/"
              variant="h5"
              underline="none"
              // component="div"
              sx={{ flexGrow: 0, flexBasis: "10%", display: { xs: "none", sm: "block" } }}
              style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
            >
              ✉️ 메일 보관함
            </Link>
            <Box sx={{ width: "50%" }} />
            <Box
              sx={{
                width: "50%",
                display: { xs: "none", sm: "flex" },
                justifyContent: "flex-end", // 오른쪽 정렬
                alignItems: "center", // 수직 중앙 정렬 (필요에 따라)
              }}
            >
              {/* {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))} */}
              <Button key="mailSend" sx={{ color: "#fff" }} onClick={goWrite}>
                메일 전송📝
              </Button>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Button key="templateList" sx={{ color: "#fff" }} onClick={goList}>
                템플릿 관리⚙️
              </Button>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              {/* <input type="button" defaultValue='템플릿 관리📝' onClick={() => handleOpen()} style={{ color: "#fff", border:"none", backgroundColor:"transparent", cursor:"pointer"}}/>
              &nbsp;&nbsp;|&nbsp;&nbsp; */}
              <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
                <Select
                  value={searchSmunionCd}
                  onChange={(e) => {
                    setSearchSmunionCd(e.target.value);
                  }}
                  displayEmpty
                  style={{ maxHeight: 28, fontSize: "small", color: "white" }}
                >
                  <MenuItem
                    // value={
                    //   userInfo?.smunionList &&
                    //   userInfo?.smunionList.map((row: any) => row.SMUNIONCD.toString())
                    // }
                    value={userInfo?.smunionList?.map((row: any) => row.SMUNIONCD.toString()).join(",")}
                    style={{ fontSize: "small" }}
                  >
                    전체
                  </MenuItem>
                  {userInfo?.smunionList &&
                    userInfo?.smunionList.map((row: any) => (
                      <MenuItem
                        key={row.SMUNIONCD}
                        value={row.SMUNIONCD.toString()}
                        style={{ fontSize: "small" }}
                      >
                        {row.SMUNIONNM}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* 지사정보 */}
              {/* <div style={{ fontSize: "11px", display: "contents" }}>
                {userInfo?.smunionNm}&nbsp;&nbsp;
              </div> */}
              <div style={{ fontSize: "11px", display: "contents" }}>
                <span style={{ marginLeft: "5px", fontSize: "13px", color: "#fff000" }}>
                  {userInfo?.korname}
                </span>
                님
              </div>
              <Button key="LOGOUT" sx={{ color: "#fff" }} onClick={handdleLogout}>
                LOGOUT
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 0 }}>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}
