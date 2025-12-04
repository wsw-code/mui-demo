'use client';


import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GameItem } from '@/type';
import { Box, Button } from '@mui/material';






export interface Props {
    list: GameItem[]
}


const Index = ({list}:Props)=> {

    

    const ref = useRef<null | HTMLElement>(null);

    const [firstRef, firstInView] = useInView({
        threshold: 0.9, 
    });

    const [lastRef, lastInView] = useInView({
        threshold: 0.9, 
    });





    useEffect(()=>{

        console.log(ref.current,'ref.current');
    },[])

    const scroll = (direction:'left' | 'right') => {
        if(ref.current){
 
            console.log(ref.current.offsetWidth,'offsetWidth');
      
            if(direction === 'left') {
                ref.current.scrollLeft -= ref.current.offsetWidth;
            } else {
                ref.current.scrollLeft += ref.current.offsetWidth;
            }
            // ref.current.scrollLeft = direction === 'left'?-= ref.current.offsetWidth:+= ref.current.offsetWidth;
        }
    }


    return (
        <Box>
            <Box sx={{
                display:'flex',
                // justifyContent:'space-between',
                color:'#fff',
            }}>
                <Button onClick={()=>{

                    scroll('left')


                }} disabled={firstInView} >PRE</Button>
                <Button disabled={lastInView} onClick={()=>{scroll('right')}} >NEXT</Button>
            </Box>
     <Box
     component="div"
        ref={ref}
     sx={{
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
        scrollSnapType:'x mandatory',
        scrollBehavior:'smooth',
        scrollbarWidth:'none',

        // grid-auto-columns
     }}>
        {
        list.map((el,index)=>(
            <Box sx={{
                padding:'0 4%',
                borderRadius:'4px',
                overflow:'hidden',
                scrollSnapAlign:'start',
                
            }}
            ref={index === 0 ? firstRef : index === list.length -1 ? lastRef : undefined}
            key={el.id}
            >
                <img className=' rounded-2xl' src={el.iconUrl} alt="" />
            </Box>
        )) 
        }
     </Box>
        </Box>


    )

}

export default Index;