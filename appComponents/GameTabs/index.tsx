
'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Tabs, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPath } from "@/utils";
import { GameItem } from "@/type";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";







const Index = ({ data }: { data: GameItem | null }) => {


    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };






    return (
        <Accordion
            sx={{
                background: '#0f212e',
                boxShadow: 'none'
            }}
            defaultExpanded
        >

            <AccordionDetails>




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
                            <img src={data?.iconUrl} alt="" className=" rounded-[6px]" />

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
                    <TabPanel keepMounted value="2">Item Two</TabPanel>
                    <TabPanel keepMounted value="3">Item Three</TabPanel>
                </TabContext>



            </AccordionDetails>
        </Accordion>

    )

}



export default Index