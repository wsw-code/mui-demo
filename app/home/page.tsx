import { Box } from "@mui/material";
import CardList from "@/components/CardList";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { GameItem } from "@/type";
import { cookies } from "next/headers";
import { isDev } from "@/utils";

const Index = async () => {


    const cookieStore = await cookies();




    try {
        const res = await fetch(`https://mui-demo.602851406.workers.dev/api/list`, {
            method: 'get',

        });
        const { data = [] } = await res.json() as { data: GameItem[] }


        return (
            <Box sx={{ color: '#fff' }}>
                <Box sx={{
                    backgroundImage: 'url(/banner.png)',
                    height: '12vw',
                    minHeight: '200px',
                    maxHeight: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>

                </Box>
                <div className=" w-full max-w-[1200px] mx-auto pb-[20px]">

                    <CardList title="推荐游戏" icon={<VideogameAssetIcon />}
                    >
                        {
                            data.map((el, index) => (
                                <Box sx={{

                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                }}
                                    key={index}
                                >
                                    <img className=' rounded-2xl' src={(el as any).iconUrl} alt="" />
                                </Box>
                            ))
                        }
                    </CardList>


                    <CardList title="热门游戏" icon={<VideogameAssetIcon />}>

                        {
                            data.map((el, index) => (
                                <Box sx={{

                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                }}
                                    key={index}
                                >
                                    <img className=' rounded-2xl' src={(el as any).iconUrl} alt="" />
                                </Box>
                            ))
                        }

                    </CardList>
                </div>
            </Box >
        )

    } catch (error) {
        console.log(error)
        return <div>ERROR-错误页面??-{JSON.stringify(error)}</div>
    }


}


export default Index