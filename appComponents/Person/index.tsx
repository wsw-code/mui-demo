'use client';

import { Box, Menu, MenuItem } from "@mui/material";
import { Avatar } from '@mui/material';
import useUserStore from '@/store/user'
import Register from '@/appComponents/Register';
import Login from '@/appComponents/Login'
import React from "react";
import { getPath } from "@/utils";
import { useRequest } from "ahooks";



const Index = () => {
    const { user, setUser } = useUserStore();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const { loading, run } = useRequest(async () => {
        const res = await fetch(getPath('/api/logout'), {
            method: 'POST',
        })
        const { code, data, message } = await res.json();
        if (code === 0) {
            setAnchorEl(null);
            setUser(null)
        } else {
            console.log(message)
        }

    }, { manual: true })


    return (
        <Box>
            {
                user ? (
                    <>
                        <Box
                            onClick={handleClick}
                            id="avator" sx={{
                                display: "flex",
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                            <Avatar alt="用户头像" />
                            {
                                user.name
                            }
                        </Box>

                        <Menu

                            slotProps={{
                                list: {
                                    'aria-labelledby': 'avator',
                                },
                            }}

                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#3a4c58',
                                    color: '#fff',
                                    // 更多样式
                                    borderRadius: '8px',

                                },
                                '& .MuiMenuItem-root': {
                                    '&:hover': {
                                        backgroundColor: '#4a5c68',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#4a5c68',
                                    },
                                },
                            }}

                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => {
                                handleClose()
                            }}
                        >
                            <MenuItem onClick={() => {
                                localStorage.removeItem('store-data');
                                run();
                            }}>退出登陆</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px'
                        }}
                    >
                        <Login />
                        <Register />
                    </Box>
                )
            }



        </Box >
    )
}

export default Index;