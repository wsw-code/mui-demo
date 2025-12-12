'use client';

import { Box, BoxProps, Button, Checkbox, FormControlLabel, FormHelperText, IconButton, InputAdornment, MenuItem, Modal, Select, styled, Tab, Tabs, TextField } from "@mui/material";
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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";




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
        paddingBottom: '10px',
        flex: 1
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




const First = ({ value, onChange, onConfirm }: { value: string, onChange?: (val: string) => void, onConfirm?: () => void }) => {




    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
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
            <Box sx={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column', display: 'flex' }}>
                <Button sx={{
                    height: '52px',
                    color: '#fff',
                    backgroundColor: '#1475e1',
                    fontSize: '18px',
                    borderRadius: '8px',

                }} onClick={() => {
                    onConfirm?.()
                }}>确认</Button>
            </Box>
        </Box>


    )
}


const Second = ({ onClose, onOk, setStatus, onSubmit }: Props & { onSubmit: (val: any) => void }) => {
    const { setUser } = useUserStore();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
            birthday: ''
        }
    });


    const next = (data: any) => {
        onSubmit(data);

    };

    return (

        <Box>
            <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>创建用户</Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(next)} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: '电邮地址必填',
                                minLength: {
                                    value: 3,
                                    message: '至少3个字符'
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
                                            marginTop: '5px'
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
                                                                color: 'rgba(255,255,255,0.5)',
                                                                "&:hover": {
                                                                    color: '#fff'
                                                                }

                                                            }}
                                                        >
                                                            {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }
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
                                            '& .MuiPickersPopper-paper': {
                                                backgroundColor: '#ccc',
                                                '& .MuiPickersCalendarHeader-label': {
                                                    color: '#ffffff',
                                                },
                                                '& .MuiDayCalendar-weekDayLabel': {
                                                    color: '#cccccc',
                                                },
                                                '& .MuiPickersDay-root': {
                                                    color: '#ffffff',
                                                    '&:hover': {
                                                        backgroundColor: '#333333',
                                                    },
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#1976d2',
                                                    },
                                                },
                                            },
                                            '& .MuiPickersInputBase-sectionsContainer': {
                                                padding: '10.5px 0'
                                            },
                                            '& .MuiIconButton-root': {
                                                color: 'rgba(255,255,255,0.5)',
                                                "&:hover": {
                                                    color: '#fff'
                                                }
                                            },
                                            '& .MuiPickersOutlinedInput-notchedOutline': {
                                                borderColor: '#2e4453',
                                                borderWidth: '2px',
                                                ':hover': {
                                                    borderColor: '#557086 !import',
                                                }

                                            },
                                            '&.Mui-focused': {
                                                '& .MuiPickersOutlinedInput-notchedOutline': {
                                                    borderColor: '#557086 !important',
                                                },
                                            },
                                            '&:hover': {
                                                '& .MuiPickersOutlinedInput-notchedOutline': {
                                                    borderColor: '#557086',

                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            )}
                        />
                        {/* <Button loading={loading} type="submit" sx={{
                            color: '#fff',
                            backgroundColor: '#1475e1',
                        }} onClick={() => {

                        }}>继续</Button> */}
                        <Button type="submit" sx={{
                            height: '52px',
                            color: '#fff',
                            backgroundColor: '#1475e1',
                            fontSize: '18px',
                            borderRadius: '8px'
                        }}>继续</Button>
                    </Box>
                </form>
            </LocalizationProvider>
        </Box>


    )
}


const Third = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            agree: false,

        }
    });


    const next = (data: any) => {
        // onSubmit(data);
        console.log(data)

    };

    return (

        <Box>
            <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>创建用户</Box>

            <Box sx={{
                background: '#213743',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                lineHeight: '2',
                height: '300px',
                overflowY: 'auto',
                marginBottom: '20px',
                '&::-webkit-scrollbar': {
                    width: '10px',  // 必须设置宽度
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: "transparent",
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#4a6572', // 滑块颜色
                    borderRadius: '5px',
                    '&:hover': {
                        backgroundColor: '#5a7582',
                    }
                },
                "& h1": {
                    fontSize: '20px',
                    fontWeight: 'bold'
                },
                "& h2": {
                    fontSize: '18px',
                    fontWeight: 'bold'
                }
            }}>
                <h1>Terms and Conditions</h1>
                <h2>1. STAKE.COM</h2>
                <p>
                    1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head office at Seru Loraweg 17, B, Curaçao. Medium Rare N.V. is licensed by the Curaçao Gaming Authority under license number OGL/2024/1451/0918. Some payment processing may be handled by its wholly owned subsidiaries, Medium Rare Limited with address 7-9 Riga Feraiou, Lizantia Court, Office 310, Agioi Omologites, 1087 Nicosia, Cyprus and registration number: HE 410775 and/or MRS Tech Ltd with address Patrikiou Loumoumpa, 7, Block A, Pervolia, 7560, Larnaca and registration number: HE 477481.
                </p>
                <p>
                    1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head office at Seru Loraweg 17, B, Curaçao. Medium Rare N.V. is licensed by the Curaçao Gaming Authority under license number OGL/2024/1451/0918. Some payment processing may be handled by its wholly owned subsidiaries, Medium Rare Limited with address 7-9 Riga Feraiou, Lizantia Court, Office 310, Agioi Omologites, 1087 Nicosia, Cyprus and registration number: HE 410775 and/or MRS Tech Ltd with address Patrikiou Loumoumpa, 7, Block A, Pervolia, 7560, Larnaca and registration number: HE 477481.
                </p>
                <p>
                    1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head office at Seru Loraweg 17, B, Curaçao. Medium Rare N.V. is licensed by the Curaçao Gaming Authority under license number OGL/2024/1451/0918. Some payment processing may be handled by its wholly owned subsidiaries, Medium Rare Limited with address 7-9 Riga Feraiou, Lizantia Court, Office 310, Agioi Omologites, 1087 Nicosia, Cyprus and registration number: HE 410775 and/or MRS Tech Ltd with address Patrikiou Loumoumpa, 7, Block A, Pervolia, 7560, Larnaca and registration number: HE 477481.
                </p>
            </Box>

            <form onSubmit={handleSubmit(next)} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <Controller
                        name="agree"
                        control={control}
                        rules={{
                            // required: '请完整阅读条款与条件，然后滚动至末尾将其接受。',
                            validate: (value) => {
                                console.log(value)
                                if (value === true) {
                                    return true; // 验证通过
                                }
                                return '请完整阅读条款与条件，然后滚动至末尾将其接受。';
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <Box>

                                <FormControlLabel

                                    control={
                                        <Checkbox
                                            {...field}
                                            value={field.value || false}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                        />
                                    }

                                    label="I have read and agree to the Terms and Conditions"
                                    sx={{
                                        color: '#fff',
                                        "& .MuiFormControlLabel-label": {
                                            color: 'rgba(255,255,255,0.8)'
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: '#fff'
                                        }
                                    }} />
                                {error && (
                                    <FormHelperText
                                        error
                                        sx={{
                                            ml: 0, // 左对齐
                                            color: '#ff6b6b',
                                            fontSize: '0.875rem',
                                            mt: 0.5
                                        }}
                                    >
                                        {error.message}
                                    </FormHelperText>
                                )}
                            </Box>
                        )}
                    />





                    <Button type="submit" sx={{
                        height: '52px',
                        color: '#fff',
                        backgroundColor: '#1475e1',
                        fontSize: '18px',
                        borderRadius: '8px'
                    }}>创建用户</Button>
                </Box>
            </form>

        </Box>


    )
}



const Index = (props: Props) => {


    const [step, setStep] = useState(0)
    const [lang, setLang] = useState("zh");
    const [submitData, setSubmitData] = useState({})

    const { setUser } = useUserStore();

    const onSubmit = (data: any) => {
        setSubmitData(data);

        console.log(data);
        setStep(pre => ++pre)
    }


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
            props?.onOk?.();
            setUser({
                name: data.username,
                email: 'xxxxx',
                id: 'xxxx'
            })

        }
    }, { manual: true });





    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <First value={lang} onChange={(val) => { setLang(val) }} onConfirm={() => { setStep(pre => ++pre) }} />
                </CusTabPanel>
                <CusTabPanel keepMounted value={1}>
                    <Second {...props} onSubmit={onSubmit} />
                </CusTabPanel>
                <CusTabPanel keepMounted value={2}>
                    <Third />
                </CusTabPanel>
            </TabContext>
            <Box sx={{ color: '#b1bad3', fontWeight: '300', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', }}>
                已有账户？ <Button sx={{ color: '#fff', fontWeight: '600', fontSize: '16px', padding: '0px', minWidth: 'auto' }} onClick={() => { props.setStatus() }} >登陆</Button>
            </Box>
        </Box >
    )
}

export default Index;