import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
    count: number
    user: any | null
    setUser: (user: any | null) => void
}

const useStore = create<StoreState>()(
    persist(
        (set) => ({
            count: 0,
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: 'store-data',
        }
    )
)


export default useStore