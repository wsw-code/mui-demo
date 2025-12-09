import { Box, styled, BoxProps, SxProps, } from '@mui/material';
import React from 'react';


export type Props = {
    open?: boolean,
    sx?: SxProps,
    onTransitionEnd?: () => void
}


// const SideBox = styled(Box, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })<BoxProps>(({ theme }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     variants: [
//         {
//             props: ({ open }) => open,
//             style: {
//                 marginLeft: drawerWidth,
//                 width: `calc(100% - ${drawerWidth}px)`,
//                 transition: theme.transitions.create(['width', 'margin'], {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.enteringScreen,
//                 }),
//             },
//         },
//     ],
// }));


const Index: React.FC<React.PropsWithChildren<Props>> = ({ children, open, sx = {}, onTransitionEnd }) => {

    return (
        <Box
            component="aside"
            onTransitionEnd={() => {
                onTransitionEnd?.()
            }}
            sx={[
                {
                    width: open ? '260px' : "80px",
                    color: '#fff',
                    backgroundColor: '#213743',
                    height: '100%',
                    overflowX: 'hidden',
                    ...sx as object,
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
            }}>
                {children}
            </Box>
        </Box>

    )
}


export default Index;