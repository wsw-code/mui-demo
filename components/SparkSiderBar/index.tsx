import { Box, SxProps, Theme, } from '@mui/material';
import MenuList from '@/components/MenuList'
import React, { useState } from 'react';
import { MenuItem } from '@/type';
import { useRouter, usePathname } from 'next/navigation';

export type Props = {
    open?: boolean,
    sx?: SxProps,
    onTransitionEnd?: () => void,
    header?: React.ReactNode,
    menuList?: MenuItem[][],
    onExpandChange?: () => void
}


const animationProps: SxProps<Theme> = (theme) => ({
    transform: 'translateY(100px)',
    opacity: 0,
    animation: `slideIn ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeOut} ${theme.transitions.duration.short}ms forwards`,
    '@keyframes slideIn': {
        from: { transform: 'translateY(100px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 }
    },

})


const Index: React.FC<React.PropsWithChildren<Props>> = ({ children, open = false, menuList = [], sx = {}, header, onTransitionEnd, onExpandChange }) => {
    const [expand, setExpand] = useState<string[]>([]);
    const pathname = usePathname();
    return (
        <Box
            sx={{
                '@media (max-width: 600px)': {
                    display: 'none'
                },
            }}
        >

            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    zIndex: 1,

                    '@media (max-width: 1000px)': {
                        display: open ? 'block' : 'none'
                    },
                    '@media (min-width: 1000px)': {
                        display: 'none'
                    },
                }}

            >

            </Box>
            <Box
                component="aside"
                onTransitionEnd={(e) => {
                    // onTransitionEnd?.()
                    if (e.propertyName === 'width') {
                        console.log(3)
                        onTransitionEnd?.();
                    }

                }}
                sx={[
                    {
                        width: open ? '260px' : "80px",
                        color: '#fff',
                        backgroundColor: '#0f212e',
                        height: '100%',
                        overflowX: 'hidden',
                        '@media (max-width: 1000px)': {
                            position: 'fixed'
                        },
                        '@media (min-width: 1000px)': {
                            position: 'static'
                        },
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        ...sx as any
                    },
                    (theme) => ({
                        transition: theme.transitions.create(['width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),

                ]}
            >
                <Box sx={{
                    height: '100%',
                    width: open ? '260px' : "80px",
                }}
                >
                    {header}

                    <Box key={open ? 'open' : 'close'} sx={animationProps}>
                        <MenuList expand={expand} setExpand={setExpand} open={open} menuList={menuList} onExpandChange={() => {
                            if (!open) {
                                onExpandChange?.()
                            }
                        }} />
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: '80px',
                height: '100%',
                '@media (max-width: 1000px)': {
                    display: 'block'
                },
                '@media (min-width: 1000px)': {
                    display: 'none'
                },
            }}>

            </Box>
        </Box>


    )
}


export default Index;