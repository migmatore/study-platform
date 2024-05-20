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