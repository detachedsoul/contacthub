"use client";

const AccountAction = () => {
    return (
		<div className="space-y-4">
			<button
				className="rounded-full p-3 w-full transition-colors duration-300 ease-in-out flex items-center place-content-center gap-2 text-center bg-lime-500 border border-lime-500/50 hover:ring-1 ring-offset-2 hover:ring-lime-500/50 ring-offset-brand-black hover:bg-lime-600"
				type="button"
			>
				Logout
            </button>

            <button
				className="rounded-full p-3 w-full transition-colors duration-300 ease-in-out flex items-center place-content-center gap-2 text-center bg-red-500 border border-red-500/50 hover:ring-1 ring-offset-2 hover:ring-red-500/50 ring-offset-brand-black hover:bg-red-600"
				type="button"
			>
				Delete Account
			</button>
		</div>
	);
};

export default AccountAction;
