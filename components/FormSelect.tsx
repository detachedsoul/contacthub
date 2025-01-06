/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { SingleValue } from "react-select";
import { Dispatch, SetStateAction, useState } from "react";

const customStyles = {
	control: (base: any, state: any) => ({
		...base,
		color: "rgba(0, 0, 0, 0.7)",
		backgroundColor: "rgba(255, 255, 255, 1)",
		border: "none",
		borderRadius: "0.5rem",
		paddingLeft: "0.5rem",
		paddingRight: "0.5rem",
		paddingTop: "0",
		paddingBottom: "0",
		width: "100%",
		fontWeight: "400",
		cursor: "pointer",
		boxShadow: state.isFocused ? "none" : "none",
	}),
	option: (base: any, state: any) => ({
		...base,
		"backgroundColor": state.isSelected ? "rgb(132 204 22)" : "white",
		"color": state.isSelected
			? "rgb(255 255 255 / 1)"
			: "rgba(151, 151, 151, 1)",
		"cursor": "pointer",
		"paddingLeft": "1rem",
		"paddingRight": "1rem",
		"paddingTop": "0.5rem",
		"paddingBottom": "0.5rem",
		"&:hover": {
			backgroundColor: "rgb(132 204 22)",
			color: "rgb(255 255 255 / 1)",
		},
	}),
	singleValue: (base: any) => ({
		...base,
		color: "#0a0a0a",
	}),
	placeholder: (base: any) => ({
		...base,
		color: "rgba(151, 151, 151, 1)",
		fontSize: "0.875rem",
	}),
	menu: (base: any) => ({
		...base,
		borderRadius: "0.5rem",
		border: "1px solid rgb(132 204 22 / 0.5)",
		boxShadow: "none",
		overflow: "hidden",
		zIndex: 999999,
	}),
};

interface IFormSelect<T> {
	noOptionsMessage?: string;
	errorMsg?: string | undefined;
	isLoading?: boolean;
	data: T | T[];
	placeholder: string;
	onChange: (value: string) => void | Dispatch<SetStateAction<string>>;
	name: string;
	errorObjectMsg?: string;
	displayKeys: { label: keyof T; value: keyof T };
}

const FormSelect = <T extends Record<string, string>>({
	noOptionsMessage = "No data found",
	errorMsg,
	isLoading,
	data,
	placeholder,
	onChange,
	name,
	errorObjectMsg,
	displayKeys,
}: IFormSelect<T>) => {
	const [option, setOption] = useState({
		label: "",
		value: "",
	});

	const hasErrorProperty = (data: any): data is { error: string } => {
		return typeof data === "object" && "error" in data;
	};

	const handleChange = (
		selectedOption: SingleValue<Record<string, string>>,
	) => {
		setOption({
			label: selectedOption?.label ?? "",
			value: selectedOption?.value ?? "",
		});

		if (onChange) {
			onChange(selectedOption?.value ?? "");
		}
	};

	return (
		<>
			{Array.isArray(data) && (
				<Select
					value={
						option.value !== ""
							? {
									label: option.label,
									value: option.value,
							  }
							: null
					}
					onChange={handleChange}
					options={data.map((option: T) => ({
						label: option[displayKeys.label as string],
						value: option[displayKeys.value as string],
					}))}
					isSearchable
					className="input px-0 py-1.5"
					placeholder={placeholder}
					styles={customStyles}
					name={name}
					noOptionsMessage={() => noOptionsMessage}
					menuPlacement="auto"
				/>
			)}

			{isLoading && (
				<div className="py-7 px-4 bg-lime-500/20 animate-pulse rounded-lg"></div>
			)}

			{(errorMsg || (hasErrorProperty(data) && data.error)) &&
				!Array.isArray(data) &&
				!isLoading && (
					<Select
						isSearchable
						className="input px-0 py-1.5"
						placeholder={placeholder}
						styles={customStyles}
						name={name}
						noOptionsMessage={() =>
							errorObjectMsg ? errorObjectMsg : errorMsg
						}
					/>
				)}
		</>
	);
};

export default FormSelect;
