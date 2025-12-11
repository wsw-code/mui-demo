import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Link, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPath } from "@/utils";
import { GameItem } from "@/type";
import GameCard from '@/components/GameCard';
import withPageAnimation from "@/components/WithPageAnimation";
import Table from '@/components/Table'
import TableRowsIcon from '@mui/icons-material/TableRows';
import DescriptionIcon from '@mui/icons-material/Description';
import TryPlayButton from '@/appComponents/TryPlayButton'

const Wrapper: React.FC<React.PropsWithChildren<{ title?: string | React.ReactNode, icon?: React.ReactNode }>> = ({ children, title, icon }) => {

    return (
        <Box

            sx={{
                backgroundColor: '#11222e',
                padding: '16px',
                borderRadius: '8px'
            }}
        >
            <Box sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                {icon}{title}
            </Box>
            <Box>
                {children}
            </Box>

        </Box>
    )
}

const Index = async ({ params }: { params: Promise<{ id: string }> }) => {


    const { id } = await params;

    const res = await fetch(getPath(`/api/game/${id}`), {
        method: 'get'
    });
    const { data } = await res.json() as { data: GameItem }


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
                <Wrapper title="描述" icon={<DescriptionIcon />}>
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        <GameCard animate={false} src={data?.iconUrl} wrapperSx={{ width: '100%', maxWidth: '150px' }} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <Box
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                            > {data?.name}</Box>
                            <Box sx={{ display: 'inline-flex', gap: '10px', alignItems: 'flex-start', flexWrap: 'wrap', alignContent: 'flex-start' }} >
                                {
                                    data?.tagList?.map((el, index) => (
                                        <Box key={index} component={"span"} sx={{
                                            backgroundColor: '#2e4453',
                                            borderRadius: '50vh',
                                            padding: '0 8px',
                                            fontSize: '12px',
                                            lineHeight: '24px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                        }}  >{el}</Box>
                                    ))
                                }
                            </Box>
                            <Box>

                                <TryPlayButton data={data} />

                            </Box>
                        </Box>
                    </Box>
                </Wrapper>

                <Wrapper title="大赢家" icon={<TableRowsIcon />}>
                    <Table
                        columns={[
                            {
                                title: '排名',
                                dataIndex: 'rank'
                            },
                            {
                                title: '玩家',
                                dataIndex: 'player'
                            },
                            {
                                title: '日期',
                                dataIndex: 'date'
                            },
                            {
                                title: '投注',
                                dataIndex: 'touzhu'
                            },
                            {
                                title: '乘数',
                                dataIndex: 'muti'
                            },
                            {
                                title: '支付额',
                                dataIndex: 'pay'
                            },
                        ]}
                        dataSource={[{
                            rank: 1,
                            player: '玩家1',
                            date: "2025-12-09",
                            touzhu: '$0.42',
                            muti: '2500 X',
                            pay: "$1000"
                        },
                        {
                            rank: 2,
                            player: '玩家2',
                            date: "2025-12-09",
                            touzhu: '$0.42',
                            muti: '2500 X',
                            pay: "$1000"
                        },
                        {
                            rank: 3,
                            player: '玩家3',
                            date: "2025-12-09",
                            touzhu: '$0.42',
                            muti: '2500 X',
                            pay: "$1000"
                        }
                        ]}
                    />
                </Wrapper>

                <Wrapper title="幸运赢家" icon={<TableRowsIcon />}>

                    <Table
                        columns={[
                            {
                                title: '排名',
                                dataIndex: 'rank'
                            },
                            {
                                title: '玩家',
                                dataIndex: 'player'
                            },
                            {
                                title: '日期',
                                dataIndex: 'date'
                            },
                            {
                                title: '投注',
                                dataIndex: 'touzhu'
                            },
                            {
                                title: '乘数',
                                dataIndex: 'muti'
                            },
                            {
                                title: '支付额',
                                dataIndex: 'pay'
                            },
                        ]}
                        dataSource={[{
                            rank: 1,
                            player: '玩家11',
                            date: "2025-12-09",
                            touzhu: '$0.421',
                            muti: '2500 X',
                            pay: "$1000"
                        },
                        {
                            rank: 2,
                            player: '玩家22',
                            date: "2025-12-09",
                            touzhu: '$0.32',
                            muti: '2500 X',
                            pay: "$1000"
                        },
                        {
                            rank: 3,
                            player: '玩家33',
                            date: "2025-12-09",
                            touzhu: '$0.332',
                            muti: '2500 X',
                            pay: "$1000"
                        }
                        ]}
                    />
                </Wrapper>

            </Box>
        </Box>
    )

}



export default withPageAnimation(Index)