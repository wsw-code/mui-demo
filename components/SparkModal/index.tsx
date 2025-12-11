'use client';

import { Box, Button, IconButton, InputAdornment, Modal, SxProps, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';





export type ModalProps = {
    /** */
    open: boolean,
    title?: string | React.ReactNode,
    onClose?: () => void,
    contentSxProps?: SxProps,
    headerSxProps?: SxProps,
    wrapperSxProps?: SxProps,
    children?: React.ReactNode,

}


const Index = ({ open, title, contentSxProps, headerSxProps, wrapperSxProps = {}, onClose, children }: ModalProps) => {

    // const [open, setOpen] = useState(false);
    return (
        <Modal
            open={open}
            onClose={() => {
                onClose?.();
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{


                // transform: 'translate(-50%, -50%)',
                backgroundColor: '#0f212e',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                ...wrapperSxProps
            }}>
                <Box sx={{
                    backgroundColor: '#1a2c38',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: "0 30px",
                    color: '#fff',
                    ...headerSxProps

                }}>
                    <Box>{title}</Box>
                    <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => {
                        onClose?.()
                    }} />
                </Box>
                <Box sx={{
                    flex: 1,
                    padding: "20px 30px 16px 30px",
                    ...contentSxProps
                }}>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}

export default Index;