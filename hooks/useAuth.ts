import { create } from "zustand";

type AuthDetails = {
	id: string;
	name: string;
	email: string;
	gender: string;
    state: string;
    points: string
} | null;

type AuthStore = {
	authDetails: AuthDetails;
	setAuthDetails: (details: AuthDetails) => void;
};

const useAuth = create<AuthStore>((set) => {
	const userDetails =
		typeof window !== "undefined"
			? localStorage.getItem("user-details")
			: null;
	const initialAuthDetails = userDetails ? JSON.parse(userDetails) : null;

	return {
		authDetails: initialAuthDetails,
		setAuthDetails: (details) => set({ authDetails: details }),
	};
});

export default useAuth;
