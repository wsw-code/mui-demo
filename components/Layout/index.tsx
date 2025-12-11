"use client";

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '@/components/Footer';
import { menuList } from '@/config/menuConfig';
import { useRouter, usePathname } from 'next/navigation';
import Person from '@/appComponents/Person';
import { useRequest } from 'ahooks';
import { getPath } from '@/utils';
import useUserStore from '@/store/user'
import ToastContainer from '@/components/ToastContainer'
import type { } from '@mui/lab/themeAugmentation';
import SparkSiderBar from '@/components/SparkSiderBar'
import MenuList from '@/components/MenuList';
import { Suspense } from "react";
import Loading from '@/components/Loading'

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
  typography: {
    // button:{
    //   fontWeight:600
    // }
    fontWeightRegular: 600
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        loadingIndicator: {
          color: '#fff'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: DrawerColor, // 深色背景
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // color: '#ffffff', // 图标白色
          // ':disabled': 'rgba(255, 255, 255, 0.5)'
          cursor: 'pointer'
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
          'padding': '8px 12px'
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
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        }
      }
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#2e4453', // 浅色分割线
          height: 2,
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-focused': {
            color: '#fff', // 聚焦时紫色
          },
          '&.Mui-required': {
            '& .MuiFormLabel-asterisk': {
              color: 'red', // 星号颜色
            },
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
          borderColor: '#2e4453',

          borderWidth: '2px',

          '&:hover': {
            borderColor: '#557086',
          },
          '&.Mui-focused': {
            borderColor: '#557086',
            // 注意：对于 OutlinedInput，需要定位到 fieldset
            // '& .MuiOutlinedInput-notchedOutline': {
            //   borderColor: '#557086',
            // },
          },

          '& .MuiInputLabel-root:hover': {
            borderColor: 'red',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },

          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
          '&.Mui-error': {
            borderColor: 'red',
            // 错误状态下的边框
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ff6b6b', // 或者使用 theme.palette.error.main
              borderWidth: 0,
            },
          }

        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          paddingLeft: '0px',
          marginLeft: '0px',
          fontSize: '14px'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // 未选中状态的默认样式
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '16px',

          // 悬停
          '&:hover': {
            color: '#fff',
          },

          // 选中状态
          '&.Mui-selected': {
            color: '#fff',
            background: '#2e4453',
            borderRadius: '50vh'
            // fontWeight: 600,
          },
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          paddingLeft: '0px',
          paddingRight: '0px',

        },

      }
    },
    // MuiTable: {
    //   styleOverrides: {
    //     root: {
    //       // backgroundColor: "#0f212e"
    //     }
    //   }
    // },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#0f212e"
        }
      }
    }

  }
});

const drawerWidth = 260;



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



const Index: React.FC<React.PropsWithChildren> = (props) => {

  const { setUser } = useUserStore();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [expand, setExpand] = React.useState<string[]>([]);



  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const pathname = usePathname();

  const { loading, run } = useRequest(async (props) => {
    const res = await fetch(getPath('/api/init'), {
      method: 'POST',

      body: JSON.stringify(props)
    })
    const { code, data } = await res.json();
    if (code === 0) {
      if (data) {
        setUser({
          name: 'wsw',
          email: 'xxxxx',
          id: 'xxxx'
        })
      } else {
        setUser(null)
      }
    }

  })






  return (
    <ThemeProvider theme={SparkTheme}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
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
        header={
          <DrawerHeader sx={{
            backgroundColor: '#0f212e',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon sx={{ color: '#fff' }} />
            </IconButton>
          </DrawerHeader>
        }
      >
        <MenuList expand={expand} setExpand={setExpand} open={open} menuList={menuList} onExpandChange={() => {
          if (!open) {
            setOpen(true)
          }
        }} />
      </SparkSiderBar>
      <Box component="main" sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1, height: '100%',
        paddingTop: '64px',
        backgroundColor: '#1a2c38',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }} >
        <Box sx={[
          { flexGrow: 1 }
        ]}>

          {props.children}

        </Box>
        <ToastContainer />
        <Footer />
      </Box>
    </ThemeProvider >
  );
}

export default Index

