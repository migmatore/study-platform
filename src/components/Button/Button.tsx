import React, {JSX} from "react";

interface IButtonProps {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
	className?: string,
}

const Button = ({children, className, ...attributes}: IButtonProps) => {
	return (
		<Button
			className="bg-indigo-400 rounded-xl text-white px-5 py-2.5 text-center text-sm font-medium hover:bg-indigo-500"
			{...attributes}>
			{children}
		</Button>
	);
}

export default Button;