import { Box, SxProps } from '@mui/material';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type Props = {
  /**图片url */
  src?: string;
  /**img 属性 */
  imgProps?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  /**外层样式 */
  wrapperSx?: SxProps;
  /**img 样式 */
  imgSx?: SxProps;
  animate?: boolean;
};

const Index: React.FC<React.PropsWithChildren<Props>> = ({
  src,
  imgProps = {},
  wrapperSx = {},
  imgSx = {},
  children,
  animate = true,
}) => {
  return (
    <Box
      sx={{
        '&:before': {
          content: '""',
          display: 'block',
          width: '100%',
          paddingTop: '134%',
        },
        position: 'relative',
        ...wrapperSx,
      }}
    >
      <Box
        sx={{
          transform: 'translateY(0)',
          transition: 'transform 200ms ease',
          borderRadius: '8px',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0px',
          left: '0px',
          '&:hover': animate ? { transform: 'translateY(-8px)' } : {},
        }}
      >
        <Box
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '8px',
            ...imgSx,
          }}
          src={src}
          {...imgProps}
        />
        {children}
      </Box>
    </Box>
  );
};

export default Index;
