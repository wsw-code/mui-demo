"use client"

import { Box } from "@mui/material"

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useEffect, useRef } from "react";




export interface Props {
    url: string
}

const Index = ({ url }: Props) => {



    const ref = useRef<HTMLIFrameElement>(null);



    return (
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
                <iframe onLoad={() => {
                    console.log('加载完成')
                }} ref={ref} className=" w-full h-full" src={url}></iframe>
            </Box>
            <Box sx={{ height: '50px', backgroundColor: '#0f212e', display: 'flex', alignItems: 'center', padding: '24px' }}>
                <OpenInFullIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => {
                    ref.current?.requestFullscreen()
                }} />
            </Box>
        </Box>
    )
}


export default Index;