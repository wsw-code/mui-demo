"use client";

import { GameItem } from "@/type";
import { Button } from "@mui/material";
import Link from "next/link";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import useUserStore from '@/store/user'
import { useRouter, usePathname } from 'next/navigation';
import { ModalApi } from '@/components/Modal';
import LoginOrRegister from '@/appComponents/LoginOrRegister';
import { modalManager } from '@/components/Modal';


const Index = ({ data }: { data?: GameItem }) => {
    const { user, setUser } = useUserStore();
    const router = useRouter();

    return (
        <>
            <Button
                sx={{
                    color: '#fff',
                    backgroundColor: '#1475e1',
                    fontWeight: 600
                }}
                startIcon={<PlayCircleIcon />}

                onClick={() => {

                    if (!user) {
                        const id = ModalApi.show({
                            content: <LoginOrRegister onClose={() => {
                                modalManager.destroy(id);
                            }} onOk={() => { router.push(`/game/${data?.id}`); }} />
                        })

                    } else {
                        router.push(`/game/${data?.id}`);
                    }
                }}
            >
                试玩
            </Button>
        </>
    )

}


export default Index;