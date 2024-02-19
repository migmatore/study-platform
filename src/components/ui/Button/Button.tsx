// import React, {JSX} from "react";
//
// interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
// 	children: JSX.Element | JSX.Element[] | React.ReactNode;
// 	className?: string,
// 	onClick?:
// 		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
// 		| undefined;
// 	//ref?: React.LegacyRef<HTMLButtonElement> | undefined;
// }
//
// const Button = ({children, className, ...attributes}: IButtonProps) => {
// 	return (
// 		<button
// 			className={`${className} transition-all duration-300 rounded-xl px-5 py-2.5 text-center text-sm font-medium`}
// 			{...attributes}>
// 			{children}
// 		</button>
// 	);
// }
//
// export default Button;

import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../../utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary-hover",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border border-input bg-transparent text-muted-foreground hover:bg-gray-50 hover:text-foreground dark:hover:bg-gray-800",
				primary_outline: "border border-primary bg-transparent text-primary hover:bg-primary-hover hover:text-primary-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
				danger: "bg-danger text-danger-foreground hover:bg-danger-hover",
				danger_outline: "border border-danger text-danger bg-transparent hover:bg-danger-hover hover:text-danger-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, variant, size, asChild = false, ...props}, ref) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
	},
);
Button.displayName = "Button";

export {Button, buttonVariants};