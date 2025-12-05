import { Box } from "@mui/material"


const Index = async ({ params }: { params: Promise<{ id: string }> }) => {


    const { id } = await params;

    return (
        <Box sx={{ color: '#fff', padding: '30px' }}>
            GAME DETAILS - {id}
        </Box>
    )

}



export default Index