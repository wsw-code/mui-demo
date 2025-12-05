// store.js
import { create } from 'zustand'
import { StoreState } from './type'


const useStore = create<StoreState>((set) => ({
    count: 0,
    user: null,
    setUser: (user) => set({ user }),
}))




export default useStore