'use client';


import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import { GameItem } from '@/type';
import { Box } from '@mui/material';






export interface Props {
    list: GameItem[]
}


const Index = ({list}:Props)=> {

    







    return (
     <Box sx={{
        display:'grid',
        gridAutoColumns:'12.5%',
        gridAutoFlow:'column',
        overflowX:'auto',

        '@container (width<1100px)': {
            gridAutoColumns: '14.3%', // 5列
        },
        '@container (width<1000px)': {
            gridAutoColumns: '16.66%', // 5列
        },
        '@container (width<900px)': {
            gridAutoColumns: '20%', // 5列
        },
        '@container (width<800px)': {
            gridAutoColumns: '25%', // 5列
        },
        '@container (width<700px)': {
            gridAutoColumns: '33.3%', // 5列
        },
        // grid-auto-columns
     }}>
        {
        list.map(el=>(
            <Box sx={{
                padding:'0 4%',
                borderRadius:'4px',
                overflow:'hidden',
            }}
            key={el.id}
            >
                <img className=' rounded-2xl' src={el.iconUrl} alt="" />
            </Box>
        )) 
        }
     </Box>

    )

}

export default Index;