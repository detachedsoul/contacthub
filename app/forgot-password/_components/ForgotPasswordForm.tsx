"use client";

const ForgotPasswordForm = () => {
	return (
		<form className="space-y-8">
			<div className="grid gap-8 md:w-4/5 md:mx-auto">
				<label htmlFor="email">
					<input
						className="input"
						type="email"
						placeholder="Email Address"
						name="email"
						id="email"
					/>
                </label>

                <button
                    className="btn"
                    type="submit"
                >
                    Reset Password
                </button>
			</div>

		</form>
	);
};

export default ForgotPasswordForm;
