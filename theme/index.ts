import { createTheme } from '@mui/material/styles';

const MainColor = '#1a2c38';

const DrawerColor = '#0d1c28';

const hoverColor = '#2e4453';

export const SparkTheme = createTheme({
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
    fontWeightRegular: 600,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#ffffff',
        },
        loadingIndicator: {
          color: '#fff',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: DrawerColor, // 深色背景
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // color: '#ffffff', // 图标白色
          // ':disabled': 'rgba(255, 255, 255, 0.5)'
          cursor: 'pointer',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&:hover': {
            backgroundColor: hoverColor, // 浅色hover效果
            // 或者使用主题颜色
            // backgroundColor: theme => theme.palette.primary.light + '20', // 20表示透明度
          },
          '&.Mui-selected': {
            backgroundColor: hoverColor, // 选中状态使用主色
          },
          padding: '8px 12px',
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
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#2e4453', // 浅色分割线
          // height: 2,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontSize: '14px',
          fontWeight: '500',
          '&.Mui-focused': {
            color: '#fff', // 聚焦时紫色
          },
          '&.Mui-required': {
            '& .MuiFormLabel-asterisk': {
              color: 'red', // 星号颜色
            },
          },
        },
      },
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
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          paddingLeft: '0px',
          marginLeft: '0px',
          fontSize: '14px',
        },
      },
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
            borderRadius: '50vh',
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
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f212e',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#444',
          '&.Mui-selected': {},
        },
      },
    },
  },
});
