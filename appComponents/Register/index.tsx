'use client';

import { Box, BoxProps, Button, IconButton, InputAdornment, MenuItem, Modal, Select, styled, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import { useRequest } from 'ahooks'
import { useForm, Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useUserStore from '@/store/user'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { getPath } from "@/utils";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ExpandMore from "@mui/icons-material/ExpandMore";


export type Props = {

    onClose?: () => void;
    onOk?: () => void;
    setStatus: () => void;
}

interface CustomBoxProps extends BoxProps {
    selected?: boolean;
}




const CustomBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<CustomBoxProps>(({ theme, selected }) => ({
    width: '100%',
    backgroundColor: selected ? "#03e702" : '#314753',
    height: '100%',
    minHeight: 'auto',
    flex: 1,
    borderRadius: '50vh'
}));


const CusTabPanel = styled(TabPanel)(({ theme }) => {
    return {
        paddingTop: '10px',
        paddingBottom: '10px'
    }
});

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
    }
});




const First = ({ value, onChange }: { value: string, onChange?: (val: string) => void }) => {




    return (
        <Box sx={{ color: '#fff', display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Box component="h2" sx={{ fontSize: '20px' }}>
                选择您的首选语言
            </Box>
            <Box sx={{ color: '#b1bad3' }}>
                Stake is available is several languages. Feel free to personalise your language across our site from the options below.
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
                    onChange?.(e.target.value)
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
    )
}


const Second = ({ onClose, onOk, setStatus }: Props) => {
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
        const res = await fetch(getPath('/api/register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 重要：告诉服务器发送的是 JSON
            },
            body: JSON.stringify(props)
        })
        const { code, data } = await res.json();
        if (code === 0) {
            setOpen(false);
            onOk?.();
            setUser({
                name: data.username,
                email: 'xxxxx',
                id: 'xxxx'
            })
            reset();
        }

    }, { manual: true })

    const onSubmit = async (data: any) => {
        run(data);
    };

    return (


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

    )
}


const Third = () => {

    return 1
}



const Index = (props: Props) => {


    const [step, setStep] = useState(0)
    const [lang, setLang] = useState("zh")

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: "10px" }}>
                <Box
                    sx={{
                        display: "flex",
                        width: '100%',
                        borderRadius: "50vh",
                        height: '4px',
                        gap: '4px'
                    }}
                >
                    <CustomBox selected={step >= 0} ></CustomBox>
                    <CustomBox selected={step >= 1}></CustomBox>
                    <CustomBox selected={step >= 2}></CustomBox>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: "#b1bad3", fontWeight: '400', fontSize: '14px' }}>
                    <Box>
                        {
                            step > 0 && (
                                <Button startIcon={<KeyboardArrowLeftIcon />} sx={{ color: 'inherit', padding: "0px", "&:hover": { color: '#fff' }, "& .MuiButton-icon": { marginRight: '0px' } }}>
                                    上一页
                                </Button>
                            )
                        }
                    </Box>
                    <Box  >
                        步骤 {step + 1} / 3
                    </Box>
                </Box>
            </Box>


            <TabContext value={step}>
                <CusTabPanel keepMounted value={0}>
                    <First value={lang} onChange={(val) => { setLang(val) }} />
                </CusTabPanel>
                <CusTabPanel keepMounted value={1}>
                    <Second {...props} />
                </CusTabPanel>
                <CusTabPanel keepMounted value={2}>
                    <Third />
                </CusTabPanel>
            </TabContext>
        </Box >
    )
}

export default Index;