
import { Box } from "@mui/material"


const Index = () => {


    return (
        <Box
            sx={{
                width: "100%",
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1a2c38'
            }}
        >
            <img className=" w-[150px]" src="/loading.gif" alt="" />
        </Box>
    )

}


export default Index