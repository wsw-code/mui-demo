
'use client';

import { Box, Tabs } from "@mui/material"
import { GameItem } from "@/type";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useRef, useState } from "react";
import GameCard from '@/components/GameCard';
import Table from '@/components/Table'





const Index = ({ data }: { data: GameItem | null }) => {


    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };






    return (
        <TabContext value={value}>
            <Box >
                <Tabs
                    onChange={handleChange}
                    value={value}
                    sx={{
                        "& .MuiTabs-list": {
                            "display": "inline-flex",
                            "width": 'auto',
                            "padding": "6px",
                            "backgroundColor": "primary.main",
                            "borderRadius": "50vh"
                        },
                        '& .MuiTabs-indicator': {
                            display: 'none'
                        },
                    }}
                    aria-label="lab API tabs example"

                >
                    <Tab label="描述" value="1" />
                    <Tab label="大赢家" value="2" />
                    <Tab label="幸运赢家" value="3" />
                </Tabs>


            </Box>
            <TabPanel keepMounted value="1">

                <Box sx={{ display: 'flex', gap: '16px' }}>
                    <GameCard src={data?.iconUrl} wrapperSx={{ width: '100%', maxWidth: '150px' }} />

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

                </Box>
            </TabPanel>


            <TabPanel keepMounted value="2">
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
            </TabPanel>
            <TabPanel keepMounted value="3">
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
            </TabPanel>
        </TabContext>

    )

}



export default Index