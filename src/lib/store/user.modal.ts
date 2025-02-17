import {create} from "zustand";


type AuthState = {
    token: string | null;
    setToken: (newToken: string) => void;
    removeToken: () => void;
    getTokenFromLocalStorage : () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token:  null,
    setToken: (newToken: string) => {
        localStorage.setItem("myBitrixToken", newToken);
        set({token: newToken});
    },
    getTokenFromLocalStorage: () => {
        const token = localStorage.getItem("myBitrixToken");
        if (token) {
            set({token});
        }
    },
    removeToken: () => {
        localStorage.removeItem("myBitrixToken"); // Remove token from localStorage
        set({token: null});
    },
}));

export default useAuthStore;