import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState } from 'react';

type AccordItem = {
  title: string;
  children?: { title: string; link: string; icon?: any }[];
};

const Index = ({ title, children = [] }: AccordItem) => {
  const [expand, setExpand] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: ['8px', '0px'],
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          background: ['#213743', 'none'],
          borderBottomWidth: ['2px', '0px'],
          borderColor: '#2e4453',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: ['0 16px', '0px'],
        }}
      >
        <Box
          component="h4"
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: ['0px', '10px'],
            height: ['48px', 'auto'],
            borderRadius: ['0px', '8px'],
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            display: ['block', 'none'],
          }}
          onClick={() => {
            setExpand((pre) => !pre);
          }}
        >
          {expand ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </Box>
      <Box
        component="ul"
        sx={{
          display: {
            xs: expand ? 'flex' : 'none',
            sm: 'block',
          },
          flexDirection: 'column',
          gap: '10px',
          background: ['#213743', 'none'],
          padding: ['16px', '0px'],
        }}
      >
        {children.map((el) => (
          <Box key={el.title} component="li">
            <Box component="a" href={el.link} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="span"
                sx={{
                  color: '#b1bad3',
                  fontSize: '14px',
                  pointerEvents: 'auto',
                  '&:hover': {
                    color: '#fff',
                    textDecorationLine: 'underline',
                    textUnderlineOffset: '25%',
                  },
                }}
              >
                {el.title}
              </Box>
              {el.icon &&
                React.cloneElement(el.icon, { sx: { fontSize: '12px', marginLeft: '5px' } })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
