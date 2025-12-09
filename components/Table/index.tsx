"use client";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';



export type ColumnItem = {
    title: string;
    dataIndex: string;
}

export type Props = {
    dataSource: any[];
    columns: ColumnItem[]
}


const Index = ({ dataSource, columns }: Props) => {

    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#0f212e', boxShadow: 'none' }}>
            <Table sx={{
                minWidth: 650,
                '& .MuiTableRow-root:nth-of-type(odd)': {
                    backgroundColor: '#213743',
                    // borderRadius: '10px',
                    "& td:first-of-type": {

                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        overflow: 'hidden',

                    },
                    "& td:last-of-type": {

                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        overflow: 'hidden',

                    }
                },
            }} aria-label="simple table">
                <TableHead sx={{ border: 'none', }}>
                    <TableRow sx={{ border: 'none' }}>
                        {
                            columns.map(el => (
                                <TableCell key={el.dataIndex} align="center" sx={{ border: 'none', backgroundColor: '#0f212e' }}>{el.title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody sx={{ border: 'none' }}>
                    {dataSource.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, border: 'none' }}
                        >

                            {
                                columns.map(el => (
                                    <TableCell key={el.dataIndex} sx={{ border: 'none' }} align="center">{row[el.dataIndex]}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}



export default Index;