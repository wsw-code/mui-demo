'use client';
import { Box } from '@mui/material';
import { useLayoutEffect, useState } from 'react';

const Index = () => {
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a2c38',
        position: open ? 'static' : 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <img className=" w-[150px]" src="/loading.gif" alt="" />
    </Box>
  );
};

export default Index;
