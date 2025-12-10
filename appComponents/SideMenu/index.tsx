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




    return (
        <>


            <SparkSiderBar open={open}
            >
                {children}
            </SparkSiderBar>


        </>

    );
};

export default Index;