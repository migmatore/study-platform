import React, {JSX} from "react";

interface IButtonProps {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
	className?: string,
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined;
	ref?: React.LegacyRef<HTMLButtonElement> | undefined;
}

const Button = ({children, className, ...attributes}: IButtonProps) => {
	return (
		<button
			className={`${className} transition-all duration-300 rounded-xl px-5 py-2.5 text-center text-sm font-medium`}
			{...attributes}>
			{children}
		</button>
	);
}

export default Button;