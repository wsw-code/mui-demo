'use client';

import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useUserStore from '@/store/user';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export type Props = {
  onClose?: () => void;
  onOk?: () => void;
  setStatus: () => void;
};

interface CustomBoxProps extends BoxProps {
  selected?: boolean;
}

const CusMenuItem = styled(MenuItem)(({ theme }) => {
  return {
    '&:hover': {
      backgroundColor: '#9AC9FD', // 悬停背景色
    },
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: '#9AC9FD', // 选中悬停背景色
      },
    },
  };
});

const First = ({
  value,
  onChange,
  onConfirm,
}: {
  value: string;
  onChange?: (val: string) => void;
  onConfirm?: () => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ color: '#fff', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <Box component="h2" sx={{ fontSize: '20px' }}>
          选择您的首选语言
        </Box>
        <Box sx={{ color: '#b1bad3' }}>
          Stake is available is several languages. Feel free to personalise your language across our
          site from the options below.
        </Box>
        <Select
          value={value}
          sx={{
            height: '44px',
            '& .MuiSelect-icon': {
              color: '#b1bad3', // 修改图标颜色
            },
          }}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          IconComponent={ExpandMore}
          MenuProps={{
            PaperProps: {
              sx: {
                // 下拉菜单整体背景
                bgcolor: '#122430',
                // 下拉菜单阴影
                boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                // 最大高度
                maxHeight: 300,
                // 滚动条样式
                '& .MuiMenu-list': {
                  padding: 0,
                },
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                },
              },
            },
          }}
        >
          <CusMenuItem value={'zh'}>中文</CusMenuItem>
          <CusMenuItem value={'en'}>English</CusMenuItem>
        </Select>
      </Box>
      <Box sx={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column', display: 'flex' }}>
        <Button
          sx={{
            height: '52px',
            color: '#fff',
            backgroundColor: '#1475e1',
            fontSize: '18px',
            borderRadius: '8px',
          }}
          onClick={() => {
            onConfirm?.();
          }}
        >
          确认
        </Button>
      </Box>
    </Box>
  );
};

export default First;
