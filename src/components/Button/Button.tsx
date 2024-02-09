import React, {JSX} from "react";

interface IButtonProps {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
	className?: string,
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined;
}

const Button = ({children, className, ...attributes}: IButtonProps) => {
	return (
		<div className="group">
			<button
				className={`${className} bg-indigo-400 rounded-xl px-5 py-2.5 text-center text-sm font-medium hover:bg-indigo-500`}
				{...attributes}>
				{children}
			</button>
		</div>

	);
}

export default Button;