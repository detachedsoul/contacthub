
import toast from "react-hot-toast";

const errorToast = (message: string) => {
    toast.error(message, {
		style: {
			backgroundColor: "rgb(239 68 68 / 1)",
			color: "white",
		},
	});
};

export default errorToast;
