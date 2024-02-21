import * as React from "react";
import { styled, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";

import DateRangeIcon from "@mui/icons-material/DateRange";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";

const iconArray = [DateRangeIcon, StickyNote2Icon, WarehouseIcon, GroupIcon];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar(WikramaLogo) {
  const [open, setOpen] = React.useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    toast.success("Logout berhasil");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            bgcolor: "white",
            color: "black",
            boxShadow: 0,
            borderBottom: 1,
            borderColor: "grey.200",
          }}
        >
          <Toolbar style={{ backgroundColor: "#1f3984" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "#000",
                width: "40px",
                marginRight: 3,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon
                sx={{
                  color: "#fff",
                }}
              />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ width: "40px", mr: 2 }}
            >
              <img
                src="https://smkwikrama.sch.id/assets2/wikrama-logo.png"
                alt="Wikrama Logo"
                width={"40px"}
                style={{ marginLeft: "20px" }}
              />
            </IconButton>
            <Typography
              noWrap
              component="div"
              style={{
                flexGrow: 1,
                color: "#FFF",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 18,
                marginLeft: "14px",
              }}
            >
              Sistem Informasi Manajemen{" "}
              <span style={{ color: "#ffeb38" }}>Praktek Kerja Lapangan</span>
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ color: "#fff", mr: "-10px" }}
            >
              <AccountCircleIcon style={{ width: "70px" }} />
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            sx={{
              color: "#000",
              width: "50px",
              ml: "190px",
            }}
          >
            <IconButton onClick={handleDrawerClose} style={{ width: "40px" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ width: "50px" }} />
              ) : (
                <ChevronLeftIcon style={{ width: "50px" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ fontFamily: "Montserrat" }}>
            {[
              { text: "Pemberangkatan", path: "/jadwal-pemberangkatan" },
              { text: "Permintaan", path: "/permintaan-pkl" },
              { text: "Penempatan", path: "/penempatan-pkl" },
              { text: "Data Laporan", path: "/data-laporan" },
            ].map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title={item.text} placement="right">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    component={Link}
                    to={item.path}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {React.createElement(iconArray[index % iconArray.length])}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider />
          <ListItem key="Logout" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component={Link}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "red",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ opacity: open ? 1 : 0, color: "red" }}
              />
            </ListItemButton>
          </ListItem>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
