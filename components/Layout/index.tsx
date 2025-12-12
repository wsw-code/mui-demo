'use client';

import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '@/components/Footer';
import { menuList } from '@/config/menuConfig';
import Person from '@/appComponents/Person';
import ToastContainer from '@/components/ToastContainer';
import type {} from '@mui/lab/themeAugmentation';
import SparkSiderBar from '@/components/SparkSiderBar';
import MenuList from '@/components/MenuList';
import { MuiModalRenderer } from '@/appComponents/LoginOrRegister/GlobalModal';
import { SparkTheme } from '@/theme';
import { drawerWidth } from '@/contants';

const DrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  };
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // 基础样式（移动端）
  marginLeft: 0,
  width: '100%',

  variants: [
    // 桌面端打开状态
    {
      props: ({ open }) => open,
      style: {
        [theme.breakpoints.up('sm')]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    },
  ],
}));

const Index: React.FC<React.PropsWithChildren> = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [expand, setExpand] = React.useState<string[]>([]);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={SparkTheme}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Stake
          </Typography>
          <Person></Person>
        </Toolbar>
      </AppBar>
      <SparkSiderBar
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        header={
          <DrawerHeader
            sx={{
              backgroundColor: '#0f212e',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon sx={{ color: '#fff' }} />
            </IconButton>
          </DrawerHeader>
        }
      >
        <MenuList
          expand={expand}
          setExpand={setExpand}
          open={open}
          menuList={menuList}
          onExpandChange={() => {
            if (!open) {
              setOpen(true);
            }
          }}
        />
      </SparkSiderBar>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100%',
          paddingTop: '64px',
          backgroundColor: '#1a2c38',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box sx={[{ flexGrow: 1 }]}>{props.children}</Box>
        <ToastContainer />
        <Footer />
      </Box>
      <MuiModalRenderer />
    </ThemeProvider>
  );
};

export default Index;
