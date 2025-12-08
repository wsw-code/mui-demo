import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPath } from "@/utils";
import { GameItem } from "@/type";
import GameTabs from '@/appComponents/GameTabs'


const Index = async ({ params }: { params: Promise<{ id: string }> }) => {


    const { id } = await params;

    const res = await fetch(getPath(`/api/game/${id}`), {
        method: 'get'
    });
    const { data = null } = await res.json() as { data: GameItem }



    return (
        <Box sx={{ color: '#fff', padding: '30px', width: '100%' }}>
            <Box
                sx={{
                    maxWidth: '1200px',
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        borderRadius: '20px',
                        height: '675px',
                        overflow: 'hidden'
                    }}
                >
                    <iframe className=" w-full h-full" src="https://sdk-test.hfrong.cn/game/eliminateStars/index.html"></iframe>
                </Box>


                <Box sx={{
                    padding: '24px'
                }}>
                    <Accordion
                        sx={{
                            background: '#0f212e'
                        }}
                        defaultExpanded
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: '#fff', marginTop: '24px', marginBottom: '24px' }} />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">{data?.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>




                            <GameTabs data={data} />


                            {/* <img src={data?.iconUrl} alt="" className=" rounded-[6px]" /> */}
                        </AccordionDetails>
                    </Accordion>


                </Box>
            </Box>
        </Box>
    )

}



export default Index