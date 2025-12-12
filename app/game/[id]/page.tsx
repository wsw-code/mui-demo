import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPath } from "@/utils";
import { GameItem } from "@/type";
import useUserStore from '@/store/user'
import GameTabs from '@/appComponents/GameTabs'
import GameIframe from '@/components/GameIframe'
import withPageAnimation from "@/components/WithPageAnimation";
import { cookies } from "next/headers";


const Index = async ({ params }: { params: Promise<{ id: string }> }) => {


    const { id } = await params;

    const res = await fetch(getPath(`/api/game/${id}`), {
        method: 'get'
    });
    const { data } = await res.json() as { data: GameItem };

    const cookieStore = await cookies();

    const token = cookieStore.get('auth_token');
    console.log('token', token?.value)

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

                <GameIframe token={token?.value} url="https://sdk-test.hfrong.cn/game/eliminateStars/index.html" />

                <Box sx={{
                    borderRadius: '5px'
                }}>
                    <Accordion
                        sx={{
                            background: '#0f212e',
                            paddingLeft: '24px',
                            paddingRight: '24px'
                        }}
                        defaultExpanded
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: '#fff', marginTop: '24px', marginBottom: '24px', }} />}
                            aria-controls="panel1-content"
                            sx={{
                                "&.MuiAccordionSummary-root": {
                                    padding: '0px'
                                }
                            }}
                        >
                            <Typography sx={{ padding: '0px' }} component="span">{data?.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ paddingLeft: '0px', paddingRight: '0px' }}>
                            <GameTabs data={data} />
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </Box>
    )

}



export default withPageAnimation(Index)