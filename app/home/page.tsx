import { Box } from "@mui/material";
import {gameList} from '@/mock/gameList';
import SparkSwiper from '@/components/SparkSwiper';

const Index = () => {



    return (
        <Box sx={{color:'#fff'}}>
            <Box sx={{
                backgroundImage:'url(/banner.png)',
                height:'12vw',
                minHeight:'200px',
                maxHeight:'300px',
                backgroundSize:'cover',
                backgroundPosition:'center'
            }}>
                
            </Box>
            <div className=" w-full max-w-[1200px] mx-auto ">
                    {/* 11sdsd */}

                <SparkSwiper
                    list={gameList}
                />
            </div>
        </Box>
    )
}


export default Index