"use client";

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Footer from '@/components/Footer';
import {menuConfigList} from '@/config/menuConfig';
import { useRouter,usePathname } from 'next/navigation';


const MainColor = '#1a2c38';

const DrawerColor = '#0d1c28';

const hoverColor = '#2e4453'

const SparkTheme = createTheme({
  palette: {
    primary: {
      main: MainColor, // 紫色
    },

    text: {
      primary: '#fff', // 主要文字白色
    //   secondary: 'rgba(255, 255, 255, 0.7)', // 次要文字浅白色
    //   disabled: 'rgba(255, 255, 255, 0.5)', // 禁用状态文字
    },
    // 也可以修改其他颜色
    secondary: {
      main: '#ff9800', // 橙色
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffeb3b',
    },
    info: {
      main: '#00bcd4',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography:{
    // button:{
    //   fontWeight:600
    // }
    fontWeightRegular:600
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          color:'#ffffff',
        }
      }
    },
    MuiDrawer:{
        styleOverrides:{
            paper:{
                backgroundColor: DrawerColor, // 深色背景
            }
        }
    },
    MuiSvgIcon:{
        styleOverrides:{
            root:{
                color: '#ffffff', // 图标白色
            }
        }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: hoverColor, // 浅色hover效果
            // 或者使用主题颜色
            // backgroundColor: theme => theme.palette.primary.light + '20', // 20表示透明度
          },
          '&.Mui-selected': {
            backgroundColor: hoverColor, // 选中状态使用主色
          },
          'padding':'8px 12px'
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: hoverColor, // 使用主色
            
          },
        //   'paddingLeft':12,
        //     'paddingRight':12,
        },
      },
    },
    MuiList:{
        styleOverrides:{
            root:{
                paddingTop: 0,
                paddingBottom: 0,
            }
        }
    },

    MuiDivider:{
        styleOverrides:{
            root:{
                backgroundColor: '#2e4453', // 浅色分割线
                height:2,
            }
        }
    },
    
  }
});

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
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
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const MiniDrawer:React.FC<React.PropsWithChildren> = (props)=> {

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const pathname = usePathname();
  return (
    <ThemeProvider theme={SparkTheme}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{
            backgroundColor:'#0f212e'
        }}>
            <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Box className=' p-[16px]'>
        <Box component={'div'} sx={{
            borderRadius: '8px',
            // className=' bg-[#1a2c38] rounded-2xl overflow-hidden' 
            
            overflow:'hidden',

            ...open?{background:'#1a2c38'}:{}

        }}  >
            <List  >
              {
                menuConfigList.map((el,index)=>(
                <ListItem key={el.path} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    selected={pathname === el.path}
                    onClick={()=>{
                      router.push(el.path);
                    }}
                    sx={[
                    {
                        minHeight: 48,
      
                    },
                    open
                        ? {
                            justifyContent: 'initial',
                        }
                        : {
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <ListItemIcon
                    sx={[
                        {
                        minWidth: 0,
                        justifyContent: 'center',
                        },
                        open
                        ? {
                            mr: 3,
                            }
                        : {
                            mr: 'auto',
                            },
                    ]}
                    >
                    {React.createElement(el.Icon)}
                    </ListItemIcon>
                    <ListItemText
                    primary={el.label}
                    sx={[
                        open
                        ? {
                            opacity: 1,
                            }
                        : {
                            opacity: 0,
                            },
                    ]}
                    />
                </ListItemButton>
                </ListItem>
                ))
              }
            </List>


            <List>
                <ListItem sx={{
                    '&:hover':{
                        backgroundColor: 'primary.main'
                    }
                }} >
                    <Divider className=' w-full'  />
                </ListItem>
            </List>
            
            
            
            <List >
            {['Test'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    
                    sx={[
                    {
                        minHeight: 48,
                        // px: 2.5,
                    },
                    open
                        ? {
                            justifyContent: 'initial',
                        }
                        : {
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <ListItemIcon
                    sx={[
                        {
                        minWidth: 0,
                        justifyContent: 'center',
                        },
                        open
                        ? {
                            mr: 3,
                            }
                        : {
                            mr: 'auto',
                            },
                    ]}
                    >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    {
                        open && (
                                                <ListItemText
                    primary={text}
                    />
                        )
                    }

                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
        </Box>


      </Drawer>
      <Box component="main" sx={{display:'flex',flexDirection:'column', flexGrow: 1,height:'100%',paddingTop:'64px',backgroundColor:'#1a2c38' }} >   
        <Box sx={{flexGrow:1}}>
            {props.children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default MiniDrawer