import {twMerge} from "tailwind-merge";
import {ClassValue, clsx} from "clsx";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(...inputs));
}

export function formatFullName(fullName: string): string {
	const names = fullName.split(" ");

	if (names.length == 3) {
		names[1] = names[1].charAt(0) + ".";
		names[2] = names[2].charAt(0) + ".";
		return names.join(" ");
	}

	return fullName;
}

export function chain(...callbacks: any[]): (...args: any[]) => void {
	return (...args: any[]) => {
		for (const callback of callbacks) {
			if (typeof callback === 'function') {
				try {
					callback(...args);
				} catch (e) {
					console.error(e);
				}
			}
		}
	};
}

interface Props {
	[key: string]: any;
}

type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
							  ? I
							  : never;

export function mergeProps<T extends Props[]>(...args: T): UnionToIntersection<TupleTypes<T>> {
	// Start with a base clone of the first argument. This is a lot faster than starting
	// with an empty object and adding properties as we go.
	const result: Props = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		const props = args[i];
		for (const key in props) {
			const a = result[key];
			const b = props[key];

			// Chain events
			if (
				typeof a === 'function' &&
				typeof b === 'function' &&
				// This is a lot faster than a regex.
				key[0] === 'o' &&
				key[1] === 'n' &&
				key.charCodeAt(2) >= /* 'A' */ 65 &&
				key.charCodeAt(2) <= /* 'Z' */ 90
			) {
				result[key] = chain(a, b);

				// Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
			} else if (
				(key === 'className' || key === 'UNSAFE_className') &&
				typeof a === 'string' &&
				typeof b === 'string'
			) {
				result[key] = clsx(a, b);
			} else {
				result[key] = b !== undefined ? b : a;
			}
		}
	}

	return result as UnionToIntersection<TupleTypes<T>>;
}