import toast from "react-hot-toast";

const successToast = (message: string) => {
    toast.success(message, {
		style: {
			backgroundColor: "rgb(132 204 22 / 1)",
			color: "white",
		},
	});
};

export default successToast;
