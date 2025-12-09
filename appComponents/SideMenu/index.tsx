'use client';

import React, { useState, useEffect } from 'react';
import SparkSiderBar from '@/components/SparkSiderBar';
import { Box, Skeleton } from '@mui/material';
import useWindowSize from '@/hooks/useWindowSize';

export type Props = {
    open?: boolean;
};

const ipadWidth = 1000;

const Index: React.FC<React.PropsWithChildren<Props>> = ({ children, open }) => {
    const { width } = useWindowSize();
    const [isClient, setIsClient] = useState(false);
    const [show, setShow] = useState(false);





    // 标记是否在客户端
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 服务端渲染期间显示骨架屏或空内容
    if (!isClient) {
        return (
            <Box sx={{ width: '80px' }}>
                <Skeleton variant="rectangular" width="100%" height="100vh" />
            </Box>
        );
    }



    return (
        <>
            {width <= ipadWidth ? (
                <>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            zIndex: 1,
                            display: open ? 'block' : 'none'
                        }}

                    >

                    </Box>

                    <SparkSiderBar open={open}

                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 2
                        }}
                    >
                        {children}
                    </SparkSiderBar>

                    <Box sx={{ width: '80px', height: '100%' }}>

                    </Box>
                </>
            ) : (

                <SparkSiderBar open={open}>
                    {children}
                </SparkSiderBar>
            )}
        </>
    );
};

export default Index;