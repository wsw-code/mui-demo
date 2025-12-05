
export type User = {
    id: string;
    name: string;
    email: string;
}

export interface StoreState {
    user: null | User;
    setUser: (user: StoreState['user']) => void;
}
