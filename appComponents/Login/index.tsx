'use client';

import { Box, Button, IconButton, InputAdornment, Modal, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useRequest } from 'ahooks'
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar } from '@mui/material';
import useUserStore from '@/store/user'
import SparkModal from '@/components/SparkModal'
import { getPath } from "@/utils";
import { toast } from '@/lib/toast'


const Index = () => {
    const { setUser } = useUserStore();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const { loading, run } = useRequest(async (props) => {
        const res = await fetch(getPath('/api/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 重要：告诉服务器发送的是 JSON
            },
            body: JSON.stringify(props)
        })
        const { code, data, message } = await res.json();
        if (code === 0) {
            setOpen(false);
            setUser({
                name: data.username,
                email: 'xxxxx',
                id: 'xxxx'
            })
            reset();
        } else {

            // console.log(message)
            toast.error(message)
        }

    }, { manual: true })

    const onSubmit = async (data: any) => {
        run(data);
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1000}

                message=""

            />
            <Button sx={{
                color: '#fff',
                backgroundColor: '#2f4553',
                fontWeight: 600
            }} onClick={() => {
                setOpen(true)

            }} >登陆</Button>

            <SparkModal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                title="登陆"
                wrapperSxProps={{
                    width: '100%',
                    maxWidth: '600px',
                }}
            >
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

                        <Button loading={loading} type="submit" sx={{
                            color: '#fff',
                            backgroundColor: '#1475e1',
                        }} onClick={() => {

                        }}>提交</Button>
                    </Box>
                </form>
            </SparkModal>
        </>
    )
}

export default Index;