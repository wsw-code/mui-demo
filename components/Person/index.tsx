'use client';

import { Box, Button, IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { Message, Visibility, VisibilityOff } from "@mui/icons-material";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
};


const Index = () => {

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (data: any) => {
        console.log('表单数据:', data);
        // 这里可以添加API调用等逻辑

        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 重要：告诉服务器发送的是 JSON
            },
            body: JSON.stringify(data)
        })

        const { code } = await res.json();


        if (code === 0) {
            setOpen(false);
            reset();
        }


    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px'
                }}
            >
                <Button
                    sx={{
                        color: '#fff',
                        backgroundColor: '#2f4553',
                        fontWeight: 600,
                    }}
                >登录</Button>
                <Button sx={{
                    color: '#fff',
                    backgroundColor: '#1475e1',
                    fontWeight: 600
                }} onClick={() => {
                    setOpen(true)
                }} >注册</Button>
            </Box>

            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}

            >
                <Box sx={{
                    ...style,
                    maxWidth: '600px',
                    // height: '100%',
                    // maxHeight: '400px',
                    backgroundColor: '#0f212e',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        backgroundColor: '#1a2c38',
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: "0 30px",
                        color: '#fff'
                    }}>
                        <Box>Stake Title</Box>
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => {
                            setOpen(false)
                        }} />
                    </Box>
                    <Box sx={{
                        flex: 1,
                        padding: "20px 30px 40px 30px",

                    }}>


                        <form onSubmit={handleSubmit(onSubmit)} >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <Controller
                                    name="username"
                                    control={control}
                                    rules={{
                                        required: '用户名必填',
                                        minLength: {
                                            value: 3,
                                            message: '至少3个字符'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Box>
                                            <InputLabel required>用户名</InputLabel>
                                            <TextField
                                                size="small"
                                                {...field}
                                                sx={{
                                                    marginTop: '5px'
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
                                            message: '至少8个字符'
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Box>
                                            <InputLabel required>密码</InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                sx={{
                                                    marginTop: '5px'
                                                }}
                                                variant='outlined'

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
                                                                        setShowPassword(pre => !pre)
                                                                    }}
                                                                    // onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                    sx={{
                                                                        color: '#fff'
                                                                    }}
                                                                >
                                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }
                                                }}
                                            />
                                        </Box>
                                    )}
                                />

                                <Button type="submit" sx={{
                                    color: '#fff',
                                    backgroundColor: '#1475e1'
                                }} onClick={() => {

                                }}>提交</Button>
                            </Box>
                        </form>

                    </Box>




                </Box>
            </Modal>
        </>
    )
}

export default Index;