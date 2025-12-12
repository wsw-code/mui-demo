'use client';

import { GameItem } from '@/type';
import { Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import useUserStore from '@/store/user';
import { useRouter } from 'next/navigation';
import { ModalApi } from '@/appComponents/LoginOrRegister/GlobalModal';
import LoginOrRegister from '@/appComponents/LoginOrRegister';
import { modalManager } from '@/appComponents/LoginOrRegister/GlobalModal';

const Index = ({ data }: { data?: GameItem }) => {
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <>
      <Button
        sx={{
          color: '#fff',
          backgroundColor: '#1475e1',
          fontWeight: 600,
        }}
        startIcon={<PlayCircleIcon />}
        onClick={() => {
          if (!user) {
            const id = ModalApi.show({
              content: (
                <LoginOrRegister
                  onClose={() => {
                    modalManager.destroy(id);
                  }}
                  onOk={() => {
                    console.log(1);
                    router.push(`/game/${data?.id}`);
                  }}
                />
              ),
            });
          } else {
            router.push(`/game/${data?.id}`);
          }
        }}
      >
        试玩
      </Button>
    </>
  );
};

export default Index;
