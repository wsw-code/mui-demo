"use client";
import { Box } from "@mui/material"
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useEffect, useRef, useState } from "react";
import useUserStore from '@/store/user';
import { ModalApi, modalManager } from "@/components/Modal";
import LoginOrRegister from "@/appComponents/LoginOrRegister";


export interface Props {
    url: string,
    token?: string
}

const showDelay = 800;

const Index = ({ url, token }: Props) => {


    const { user, setUser } = useUserStore();

    const ref = useRef<HTMLIFrameElement>(null);
    const StartTime = useRef<number>(0)

    const [show, setShow] = useState(false);

    useEffect(() => {
        StartTime.current = Date.now();
    }, [])

    useEffect(() => {
        if (!token) {
            const id = ModalApi.show({
                content: <LoginOrRegister onClose={() => {
                    modalManager.destroy(id);
                }} onOk={() => {


                }} />
            })
        }
    }, [token])

    return (
        user ? (
            <Box
                sx={{
                    width: '100%',
                    borderRadius: '10px',
                    height: '675px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >

                <Box sx={{ flex: 1 }}>
                    <Box sx={{ height: '100%' }}>
                        <Box component="iframe" sx={{
                            display: show ? 'block' : 'none',
                            width: '100%',
                            height: '100%'
                        }}

                            onLoad={() => {
                                console.log(StartTime.current);
                                const gap = Date.now() - StartTime.current;
                                if (gap >= showDelay) {
                                    setShow(true)
                                } else {
                                    setTimeout(() => {
                                        setShow(true)
                                    }, showDelay - gap)
                                }



                            }} ref={ref} src={url}></Box>
                        {
                            !show && (
                                <Box
                                    sx={{
                                        background: '#0f212e',
                                        width: '100%',
                                        height: '100%',
                                        position: "relative"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: '120px',
                                            width: '20%',
                                            height: '14px',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            margin: 'auto',
                                            borderRadius: '50vh',
                                            backgroundColor: '#1a2c38',

                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '2px',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "20%",
                                                height: "100%",
                                                backgroundColor: '#fff',
                                                borderRadius: '50vh',
                                                animation: 'slide 0.6s ease-in-out infinite alternate',
                                                '@keyframes slide': {
                                                    '0%': {
                                                        transform: 'translateX(0)',
                                                    },
                                                    '100%': {
                                                        transform: 'translateX(400%)', // (100% - 15%) / 15% ≈ 566%
                                                    },
                                                },

                                            }}
                                        ></Box>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                </Box>
                <Box sx={{ height: '50px', backgroundColor: '#0f212e', display: 'flex', alignItems: 'center', padding: '24px' }}>
                    <OpenInFullIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => {
                        ref.current?.requestFullscreen()
                    }} />
                </Box>
            </Box>
        ) : null

    )
}


export default Index;