'use client';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Divider,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { useForm, Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useUserStore from '@/store/user';
import { getPath } from '@/utils';
import { toast } from '@/lib/toast';
import UserSvg from '@/svg/user';
import GoogleLogo from '@/svg/google';

const CustomButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  border: 0,
  borderRadius: '8px',
  background: '#314753',
  height: '48px',
  fontSize: '18px',
  // 悬停效果
  '&:hover': {
    background: '#577287',
  },
}));

export type Props = {
  onClose?: () => void;
  onOk?: () => void;
  setStatus: () => void;
};

const Index = ({ onClose, onOk, setStatus }: Props) => {
  const { setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { loading, run } = useRequest(
    async (props) => {
      const res = await fetch(getPath('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      });
      const { code, data, message } = await res.json();
      if (code === 0) {
        onClose?.();
        onOk?.();
        setUser({
          name: data.username,
          email: 'xxxxx',
          id: 'xxxx',
        });
        reset();
      } else {
        toast.error(message);
      }
    },
    { manual: true }
  );

  const onSubmit = async (data: any) => {
    run(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Controller
          name="username"
          control={control}
          rules={{
            required: '用户名必填',
            minLength: {
              value: 3,
              message: '至少3个字符',
            },
          }}
          render={({ field }) => (
            <Box>
              <InputLabel required>电邮地址或用户名</InputLabel>
              <TextField
                size="small"
                {...field}
                sx={{
                  marginTop: '5px',
                }}
                // label="用户名"
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: '密码必填',
            minLength: {
              value: 8,
              message: '至少8个字符',
            },
          }}
          render={({ field }) => (
            <Box>
              <InputLabel required>密码</InputLabel>
              <TextField
                {...field}
                size="small"
                sx={{
                  marginTop: '5px',
                }}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                fullWidth
                margin="normal"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="切换密码可见性"
                          onClick={() => {
                            setShowPassword((pre) => !pre);
                          }}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{
                            color: 'rgba(255,255,255,0.5)',
                            '&:hover': {
                              color: '#fff',
                            },
                          }}
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}
        />

        <Button
          loading={loading}
          type="submit"
          sx={{
            height: '52px',
            color: '#fff',
            backgroundColor: '#1475e1',
            fontSize: '18px',
            borderRadius: '8px',
          }}
          onClick={() => {}}
        >
          登录
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <Divider
          component="div"
          role="presentation"
          sx={{
            background: 'transparent',
            '&:before': { borderColor: '#324854' },
            '&:after': { borderColor: '#324854' },
          }}
        >
          <Typography sx={{ color: '#b1bad3', fontWeight: 300 }}>或者使用</Typography>
        </Divider>
        <CustomButton startIcon={<UserSvg />}>使用密钥登录</CustomButton>
        <CustomButton startIcon={<GoogleLogo />}>使用以下方式登录 Google</CustomButton>
        <CustomButton>用另一种方式签名</CustomButton>
      </Box>
      <Box
        sx={{
          color: '#b1bad3',
          fontWeight: '300',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '110px',
        }}
      >
        还未有账户？{' '}
        <Button
          sx={{
            color: '#fff',
            fontWeight: '600',
            fontSize: '16px',
            padding: '0px',
          }}
          onClick={() => {
            setStatus();
          }}
        >
          注册账户
        </Button>
      </Box>
    </form>
  );
};

export default Index;
