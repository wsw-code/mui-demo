import { SxProps } from "@mui/material";



export const gameCardProps: SxProps = {
    gridAutoColumns: '12.5%', // 8列
    '@container (width<1200px)': {
        gridAutoColumns: '14.3%', // 7列
    },
    '@container (width<1100px)': {
        gridAutoColumns: '16.66%', // 6列
    },
    '@container (width<1000px)': {
        gridAutoColumns: '20%', // 5列
    },
    '@container (width<600px)': {
        gridAutoColumns: '33.3%', // 3列
    },
}


export const activityProps: SxProps = {
    gridAutoColumns: ['100%', "100%", "50%", '33.33%'],
}


export const activityList = [
    {
        title: '促销活动',
        title2: "英超联赛",
        title3: '领先2球赔付活动',
        path: '/1.png'
    },
    {
        title: '独家活动',
        title2: "12天倍数挑战",
        title3: '瓜分$120,000',
        path: '/2.png'
    },
    {
        title: '促销活动',
        title2: "NFL",
        title3: '第三节赔付活动',
        path: '/3.png'
    },
    {
        title: '促销活动',
        title2: "英超联赛",
        title3: '领先2球赔付活动',
        path: '/4.png'
    },
    {
        title: 'Stake 独家',
        title2: "Big Bass BOOM",
        title3: '领先2球赔付活动',
        path: '/5.png'
    }
]