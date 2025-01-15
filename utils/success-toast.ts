import toast from "react-hot-toast";

const successToast = (message: string) => {
    toast.success(message, {
		style: {
			backgroundColor: "#cef006",
			color: "#000100",
		},
	});
};

export default successToast;
