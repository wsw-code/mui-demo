'use client';

import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useUserStore from '@/store/user';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export type Props = {
  onClose?: () => void;
  onOk?: () => void;
  setStatus: () => void;
};

const Second = ({
  onClose,
  onOk,
  setStatus,
  onSubmit,
}: Props & { onSubmit: (val: any) => void }) => {
  const { setUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      birthday: '',
    },
  });

  const next = (data: any) => {
    onSubmit(data);
  };

  return (
    <Box>
      <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>
        创建用户
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(next)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: '电邮地址必填',
                minLength: {
                  value: 3,
                  message: '至少3个字符',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的邮箱地址',
                },
              }}
              render={({ field }) => (
                <Box>
                  <InputLabel required>电邮地址</InputLabel>
                  <TextField
                    size="small"
                    {...field}
                    sx={{
                      marginTop: '5px',
                    }}
                    // label="用户名"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    fullWidth
                    margin="normal"
                  />
                </Box>
              )}
            />
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
                  <InputLabel required>用户名</InputLabel>
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

            <Controller
              name="birthday"
              control={control}
              rules={{
                required: '出生日期必填',
              }}
              render={({ field }) => (
                <Box>
                  <InputLabel required>出生日期</InputLabel>
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={field.onChange}
                    sx={{
                      width: '100%',
                      '& .MuiPickersInputBase-sectionsContainer': {
                        padding: '10.5px 0',
                      },
                      '& .MuiIconButton-root': {
                        color: 'rgba(255,255,255,0.5)',
                        '&:hover': {
                          color: '#fff',
                        },
                      },
                      '& .MuiPickersOutlinedInput-notchedOutline': {
                        borderColor: '#2e4453',
                        borderWidth: '2px',
                        ':hover': {
                          borderColor: '#557086 !import',
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiPickersOutlinedInput-notchedOutline': {
                          borderColor: '#557086 !important',
                        },
                      },
                      '&:hover': {
                        '& .MuiPickersOutlinedInput-notchedOutline': {
                          borderColor: '#557086 !important',
                        },
                      },
                    }}
                  />
                </Box>
              )}
            />
            <Button
              type="submit"
              sx={{
                height: '52px',
                fontSize: '18px',
                borderRadius: '8px',
              }}
              variant="blue"
            >
              继续
            </Button>
          </Box>
        </form>
      </LocalizationProvider>
    </Box>
  );
};

export default Second;
