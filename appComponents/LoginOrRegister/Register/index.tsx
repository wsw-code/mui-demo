'use client';

import { Box, BoxProps, Button, MenuItem, styled } from '@mui/material';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import useUserStore from '@/store/user';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { getPath } from '@/utils';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import dayjs from 'dayjs';
import First from '@/appComponents/LoginOrRegister/Register/First';
import Second from '@/appComponents/LoginOrRegister/Register/Second';
import Third from '@/appComponents/LoginOrRegister/Register/Third';

export type Props = {
  onClose?: () => void;
  onOk?: () => void;
  setStatus: () => void;
};

interface CustomBoxProps extends BoxProps {
  selected?: boolean;
}

const CustomBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CustomBoxProps>(({ theme, selected }) => ({
  width: '100%',
  backgroundColor: selected ? '#03e702' : '#314753',
  height: '100%',
  minHeight: 'auto',
  flex: 1,
  borderRadius: '50vh',
}));

const CusTabPanel = styled(TabPanel)(({ theme }) => {
  return {
    paddingTop: '10px',
    paddingBottom: '10px',
    flex: 1,
  };
});

const CusMenuItem = styled(MenuItem)(({ theme }) => {
  return {
    '&:hover': {
      backgroundColor: '#9AC9FD', // 悬停背景色
    },
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: '#9AC9FD', // 选中悬停背景色
      },
    },
  };
});

const Index = (props: Props) => {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('zh');
  const [submitData, setSubmitData] = useState<any>({});

  const { setUser } = useUserStore();

  const onSubmit = (data: any) => {
    setSubmitData(data);
    setStep((pre) => ++pre);
  };

  const { loading, run } = useRequest(
    async (submitData) => {
      const res = await fetch(getPath('/api/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 重要：告诉服务器发送的是 JSON
        },
        body: JSON.stringify(submitData),
      });
      const { code, data } = await res.json();
      if (code === 0) {
        props?.onOk?.();
        props?.onClose?.();
        setUser({
          name: data.username,
          email: 'xxxxx',
          id: 'xxxx',
        });
      }
    },
    { manual: true }
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            borderRadius: '50vh',
            height: '4px',
            gap: '4px',
          }}
        >
          <CustomBox selected={step >= 0}></CustomBox>
          <CustomBox selected={step >= 1}></CustomBox>
          <CustomBox selected={step >= 2}></CustomBox>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#b1bad3',
            fontWeight: '400',
            fontSize: '14px',
          }}
        >
          <Box>
            {step > 0 && (
              <Button
                startIcon={<KeyboardArrowLeftIcon />}
                sx={{
                  color: 'inherit',
                  padding: '0px',
                  '&:hover': { color: '#fff' },
                  '& .MuiButton-icon': { marginRight: '0px' },
                }}
              >
                上一页
              </Button>
            )}
          </Box>
          <Box>步骤 {step + 1} / 3</Box>
        </Box>
      </Box>

      <TabContext value={step}>
        <CusTabPanel keepMounted value={0}>
          <First
            value={lang}
            onChange={(val) => {
              setLang(val);
            }}
            onConfirm={() => {
              setStep((pre) => ++pre);
            }}
          />
        </CusTabPanel>
        <CusTabPanel keepMounted value={1}>
          <Second {...props} onSubmit={onSubmit} />
        </CusTabPanel>
        <CusTabPanel keepMounted value={2}>
          <Third
            onOk={() => {
              const res = {
                ...submitData,
                birthday: dayjs(submitData.birthday).format('YYYY-MM-DD'),
              };
              console.log('提交的数据', res);
              run(res);
            }}
          >
            <Button
              type="submit"
              loading={loading}
              sx={{
                height: '52px',
                fontSize: '18px',
                borderRadius: '8px',
              }}
              variant="blue"
            >
              创建用户
            </Button>
          </Third>
        </CusTabPanel>
      </TabContext>
      <Box
        sx={{
          color: '#b1bad3',
          fontWeight: '300',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        已有账户？{' '}
        <Button
          sx={{
            color: '#fff',
            fontWeight: '600',
            fontSize: '16px',
            padding: '0px',
            minWidth: 'auto',
          }}
          onClick={() => {
            props.setStatus();
          }}
        >
          登陆
        </Button>
      </Box>
    </Box>
  );
};

export default Index;
