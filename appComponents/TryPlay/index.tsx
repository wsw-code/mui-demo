"use client";
import useUserStore from '@/store/user';
import { Box, Button } from "@mui/material";




const Index = () => {



    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '10px',
                height: '300px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "#0f212e",
                position: 'relative'
            }}
        >

            <Box>
                <Box component="span">试玩请登录</Box>
                <Button
                    sx={{
                        color: '#fff',
                        backgroundColor: '#1475e1',
                        fontWeight: 600,
                        fontSize: '18px'
                    }}
                >登陆</Button>
            </Box>
        </Box>
    )
}




export default Index