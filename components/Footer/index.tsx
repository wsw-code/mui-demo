import { Box } from "@mui/material"
import AccordionList from '@/components/AccordionList'

import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
const props = {
    title: '娱乐城',
    children: [
        {
            title: '赌场游戏',
            link: ''
        },
        {
            title: '老虎机',
            link: ''
        },
        {
            title: '真人赌场',
            link: ''
        },
        {
            title: '俄罗斯转盘',
            link: ''
        },
        {
            title: '21点',
            link: '',
            icon: ArrowOutwardOutlinedIcon
        },
        {
            title: '扑克',
            link: '',
            icon: ArrowOutwardOutlinedIcon
        }
    ]
}

const num = 600



const Index = () => {



    return (
        <Box sx={{ color: '#fff', backgroundColor: '#091d2a', display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <Box sx={{
                display: "grid",
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                maxWidth: '1200px',
                margin: 'auto',
                width: '100%',
                gridTemplateColumns: ["1fr", "repeat(auto-fit,minmax(14ch,1fr))"],
                gap: ["10px", "0px"]



            }}>
                {
                    [1, 2, 3, 4, 5].map(el => (
                        <AccordionList key={el} {...props} ></AccordionList>
                    ))
                }
            </Box>
        </Box >
    )
}

export default Index