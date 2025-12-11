import { Box } from "@mui/material";
import React from 'react'


const Index: React.FC<React.PropsWithChildren> = ({ children }) => {



    return (
        <Box
            sx={{
                // transform: 'translateY(20px)',
                opacity: 0,
                animation: 'slideIn 200ms cubic-bezier(0.0, 0, 0.2, 1)  forwards;',
                '@keyframes slideIn': {
                    from: { transform: 'translateY(20px)', opacity: 0 },
                    to: { transform: 'translateY(0)', opacity: 1 }
                },
            }}
        >
            {children}
        </Box>
    )

}


export default Index;