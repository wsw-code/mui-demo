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
        '@media (max-width: 999px)': {
            gridAutoColumns: '20%', // 5个/行
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