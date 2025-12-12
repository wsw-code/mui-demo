import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

export type Props = {
  open?: boolean;
  sx?: SxProps;
  header?: React.ReactNode;
  onClose?: () => void;
};

const animationProps: SxProps<Theme> = (theme) => ({
  transform: 'translateY(100px)',
  opacity: 0,
  animation: `slideIn ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeOut} ${theme.transitions.duration.short}ms forwards`,
  '@keyframes slideIn': {
    from: { transform: 'translateY(100px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
});

const Index: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  open = false,
  sx = {},
  header,
  onClose,
}) => {
  return (
    <Box
      sx={{
        display: ['none', 'block'],
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 1,

          '@media (max-width: 1000px)': {
            display: open ? 'block' : 'none',
          },
          '@media (min-width: 1000px)': {
            display: 'none',
          },
          display: [''],
        }}
        onClick={() => {
          onClose?.();
        }}
      ></Box>
      <Box
        component="aside"
        sx={[
          {
            width: open ? '260px' : '80px',

            color: '#fff',
            backgroundColor: '#0f212e',
            height: '100%',
            overflowX: 'hidden',
            '@media (max-width: 1000px)': {
              position: 'fixed',
            },
            '@media (min-width: 1000px)': {
              position: 'static',
            },
            top: 0,
            left: 0,
            zIndex: 2,
            ...(sx as any),
          },
          (theme) => ({
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        ]}
      >
        <Box
          sx={{
            height: '100%',
            width: open ? '260px' : '80px',
          }}
        >
          {header}

          <Box key={open ? 'open' : 'close'} sx={animationProps}>
            {children}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '80px',
          height: '100%',
          '@media (max-width: 1000px)': {
            display: 'block',
          },
          '@media (min-width: 1000px)': {
            display: 'none',
          },
        }}
      ></Box>
    </Box>
  );
};

export default Index;
