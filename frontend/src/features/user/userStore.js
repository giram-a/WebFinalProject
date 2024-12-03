import { create } from "zustand";
import { getUser } from "@/api/userApi";

const useUserStore = create((set) => ({
    user: {},
    status: "",
    fetchUser: async ({ id, token }) => {
        set({ status: "PENDING" });
        try {
            const response = await getUser(id, token);
            if (response.status) {
                set({ user: response.data, status: "FULFILLED" });
            } else {
                set({ user: {}, status: "ERROR" });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            set({ user: {}, status: "ERROR" });
        }
    },
    updateUserPremiumStatus: (isPremiumUser) => {
        set((state) => ({
            user: {
                ...state.user,
                isPremiumUser,
            },
        }));
    },
    updateUserResumeLink: (resumeLink) => {
        set((state) => ({
            user: {
                ...state.user,
                resumeLink,
            },
        }));
    }
}));

export default useUserStore;
