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
    },
    updateJobState: (jobId, newState) => {
        set((state) => {
            const updatedAppliedJobs = state.user.appliedJob.map((job) =>
                job.jobId === jobId
                    ? { ...job, details: { ...job.details, state: newState } }
                    : job
            );

            return {
                user: {
                    ...state.user,
                    appliedJob: updatedAppliedJobs,
                },
            };
        });
    },
    addAppliedJob: (newJob) => {
        set((state) => ({
            user: {
                ...state.user,
                appliedJob: [...(state.user.appliedJob || []), newJob],
            },
        }));
    },
}));

export default useUserStore;
