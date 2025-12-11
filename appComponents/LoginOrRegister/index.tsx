'use client';

import { Box, Button, IconButton, InputAdornment, Modal, Snackbar, TextField, Divider, Typography, styled } from "@mui/material";
import Login from '@/appComponents/Login'
import { useState } from "react";
import Register from '@/appComponents/Register'



export type Props = {

    onClose?: () => void;
    onOk?: () => void;
}

const Index = ({ onClose, onOk }: Props) => {

    const [status, setStatus] = useState<"login" | "register">("login")



    const toggle = () => {
        setStatus(pre => pre === "login" ? "register" : 'login')
    }

    return (

        <Box>
            {
                status === "login" ? (
                    <Login setStatus={toggle} onClose={onClose} onOk={onOk} />
                ) : <Register setStatus={toggle} onClose={onClose} onOk={onOk} />
            }

        </Box>



    )
}

export default Index;