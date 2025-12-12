'use client';

import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { PropsWithChildren } from 'react';

import { useForm, Controller } from 'react-hook-form';

export type Props = {
  onClose?: () => void;
  onOk?: () => void;
  setStatus: () => void;
};

const Third: React.FC<PropsWithChildren<{ onOk?: () => void }>> = ({ onOk, children }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      agree: false,
    },
  });

  const next = () => {
    onOk?.();
  };

  return (
    <Box>
      <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>
        创建用户
      </Box>

      <Box
        sx={{
          background: '#213743',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          lineHeight: '2',
          height: '300px',
          overflowY: 'auto',
          marginBottom: '20px',
          '&::-webkit-scrollbar': {
            width: '10px', // 必须设置宽度
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4a6572', // 滑块颜色
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#5a7582',
            },
          },
          '& h1': {
            fontSize: '20px',
            fontWeight: 'bold',
          },
          '& h2': {
            fontSize: '18px',
            fontWeight: 'bold',
          },
        }}
      >
        <h1>Terms and Conditions</h1>
        <h2>1. STAKE.COM</h2>
        <p>
          1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or
          "Us"), a company with head office at Seru Loraweg 17, B, Curaçao. Medium Rare N.V. is
          licensed by the Curaçao Gaming Authority under license number OGL/2024/1451/0918. Some
          payment processing may be handled by its wholly owned subsidiaries, Medium Rare Limited
          with address 7-9 Riga Feraiou, Lizantia Court, Office 310, Agioi Omologites, 1087 Nicosia,
          Cyprus and registration number: HE 410775 and/or MRS Tech Ltd with address Patrikiou
          Loumoumpa, 7, Block A, Pervolia, 7560, Larnaca and registration number: HE 477481.
        </p>
        <p>
          1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or
          "Us"), a company with head office at Seru Loraweg 17, B, Curaçao. Medium Rare N.V. is
          licensed by the Curaçao Gaming Authority under license number OGL/2024/1451/0918. Some
          payment processing may be handled by its wholly owned subsidiaries, Medium Rare Limited
          with address 7-9 Riga Feraiou, Lizantia Court, Office 310, Agioi Omologites, 1087 Nicosia,
          Cyprus and registration number: HE 410775 and/or MRS Tech Ltd with address Patrikiou
          Loumoumpa, 7, Block A, Pervolia, 7560, Larnaca and registration number: HE 477481.
        </p>
        <p>
          1.1 Stake.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or
          "Us"), a company with head office at Seru Loraweg 17, B, Curaçao. Medium Rare N.V. is
          licensed by the Curaçao Gaming Authority under license number OGL/2024/1451/0918. Some
          payment processing may be handled by its wholly owned subsidiaries, Medium Rare Limited
          with address 7-9 Riga Feraiou, Lizantia Court, Office 310, Agioi Omologites, 1087 Nicosia,
          Cyprus and registration number: HE 410775 and/or MRS Tech Ltd with address Patrikiou
          Loumoumpa, 7, Block A, Pervolia, 7560, Larnaca and registration number: HE 477481.
        </p>
      </Box>

      <form onSubmit={handleSubmit(next)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Controller
            name="agree"
            control={control}
            rules={{
              // required: '请完整阅读条款与条件，然后滚动至末尾将其接受。',
              validate: (value) => {
                console.log(value);
                if (value === true) {
                  return true; // 验证通过
                }
                return '请完整阅读条款与条件，然后滚动至末尾将其接受。';
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value={field.value || false}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  }
                  label="I have read and agree to the Terms and Conditions"
                  sx={{
                    color: '#fff',
                    '& .MuiFormControlLabel-label': {
                      color: 'rgba(255,255,255,0.8)',
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#fff',
                    },
                  }}
                />
                {error && (
                  <FormHelperText
                    error
                    sx={{
                      ml: 0, // 左对齐
                      color: '#ff6b6b',
                      fontSize: '0.875rem',
                      mt: 0.5,
                    }}
                  >
                    {error.message}
                  </FormHelperText>
                )}
              </Box>
            )}
          />

          {children}
        </Box>
      </form>
    </Box>
  );
};

export default Third;
