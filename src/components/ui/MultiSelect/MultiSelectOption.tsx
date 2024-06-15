import {MouseEvent, useEffect, useRef} from "react";

export type MultiSelectItem = {
	id: number;
	label: string;
}

type MultiSelectOptionProps = {
	item: MultiSelectItem;
	handleListItemClick: (e: MouseEvent<HTMLLIElement>, item: MultiSelectItem) => void;
	isFocused: boolean;
};

const MultiSelectOption = ({item, handleListItemClick, isFocused}: MultiSelectOptionProps) => {
	// Ref used to access individual item
	const ref = useRef<HTMLLIElement>(null);

	// As we are doing manual focus management
	// We need to keep selected item into the view when using up down arrow keys
	// Because of overflow in the suggestions list
	useEffect(() => {
		if (isFocused && ref.current) {
			ref.current.scrollIntoView({behavior: "auto", block: "nearest"});
		}
	}, [isFocused]);

	return (
		<li
			ref={ref}
			key={item.id}
			onClick={(e) => handleListItemClick(e, item)}
			className={`cursor-pointer
              flex justify-between items-center
              hover:bg-gray-200 hover:rounded-lg hover:text-foreground
              px-1 py-2 text-sm
              ${isFocused ? "bg-gray-200 rounded-lg" : ""}`}
		>
			<span>{item.label}</span>
		</li>
	);
};

export default MultiSelectOption;