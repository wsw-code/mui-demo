'use client';


import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Button, ButtonGroup, SxProps } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



export interface Props {
    title?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    wrapperSxProps?: SxProps
}


const Index = ({ title, icon, children, wrapperSxProps = {} }: Props) => {



    const ref = useRef<null | HTMLElement>(null);

    const [firstRef, firstInView] = useInView({
        threshold: 0.9,
    });

    const [lastRef, lastInView] = useInView({
        threshold: 0.9,
    });

    const scroll = (direction: 'left' | 'right') => {
        if (ref.current) {
            if (direction === 'left') {
                ref.current.scrollLeft -= ref.current.offsetWidth;
            } else {
                ref.current.scrollLeft += ref.current.offsetWidth;
            }
        }
    }

    useEffect(() => {
        if (ref.current) {
            firstRef(ref.current?.children[0])
            lastRef(ref.current?.children[ref.current?.children?.length - 1])
        }

    }, [children])

    return (
        <Box sx={{
            containerType: 'inline-size'
        }}>
            <Box sx={{
                display: 'flex',
                color: '#fff',
                paddingTop: '20px',
                justifyContent: 'space-between',
            }}>
                <Box className=' flex items-center'>

                    {
                        icon && (
                            <span className=' mr-[10px]'>
                                {icon}
                            </span>
                        )
                    }

                    <span className=' font-bold'>
                        {title}
                    </span>
                </Box>
                <ButtonGroup
                    disableElevation
                    variant="outlined"
                    aria-label="Disabled button group"
                    size='large'
                    sx={{
                        height: '40px',
                    }}
                >
                    <Button
                        disabled={firstInView}
                        sx={{
                            borderRadius: '20px 0 0 20px',
                            borderColor: '#2f4553',
                            ":disabled": {
                                borderColor: '#2f4553',
                                color: 'rgba(255, 255, 255, 0.5)'
                            },
                            paddingLeft: '20px',
                            paddingRight: '12px',
                        }}
                        onClick={() => { scroll('left') }}
                    ><ArrowBackIosIcon fontSize='inherit' sx={{ fontWeight: 100 }} /></Button>
                    <Button
                        sx={{
                            borderRadius: '0px 20px 20px 0px',
                            borderColor: '#2f4553',
                            ":disabled": {
                                borderColor: '#2f4553',
                                color: 'rgba(255, 255, 255, 0.5)'
                            },
                            paddingLeft: '12px',
                            paddingRight: '20px',
                        }}

                        disabled={lastInView}
                        onClick={() => { scroll('right') }}
                    ><ArrowForwardIosIcon fontSize="inherit" color='inherit' sx={{ fontWeight: 100 }} /></Button>
                </ButtonGroup>
            </Box>

            <Box
                component="div"
                ref={ref}

                sx={{
                    display: 'grid',

                    gridAutoFlow: 'column',
                    overflowX: 'auto',
                    paddingTop: '20px',

                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    '& > *': {
                        scrollSnapAlign: 'start',
                        padding: '0 4%',
                    },
                    ...wrapperSxProps
                }}>
                {children}
            </Box>
        </Box>


    )

}

export default Index;