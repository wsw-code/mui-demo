import { Box } from "@mui/material"



export function withPageAnimation<P extends object>(Component: React.ComponentType<P>) {
    return function AnimatedPage(props: any) {
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
                <Component {...props} />
            </Box>
        )
    }
}

export default withPageAnimation