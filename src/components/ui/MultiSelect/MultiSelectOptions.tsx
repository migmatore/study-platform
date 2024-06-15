import {Dispatch, MouseEvent, SetStateAction} from "react";
import MultiSelectOption, {MultiSelectItem} from "./MultiSelectOption";

type MultiSelectOptionsProps = {
	items: MultiSelectItem[];
	show: boolean;
	add: (product: MultiSelectItem) => void;
	selectedIndex: number;
	setShowList: Dispatch<SetStateAction<boolean>>;
};

const MultiSelectOptions = ({
	items,
	show,
	add,
	selectedIndex,
	setShowList,
}: MultiSelectOptionsProps) => {
	if (!show) return null;

	const handleListItemClick = (e: MouseEvent<HTMLLIElement>, item: MultiSelectItem) => {
		add(item);
		setShowList(e.ctrlKey);
	};

	return (
		<div
			className="absolute z-50 mt-2 shadow-md rounded-xl p-1 w-fit bg-white max-h-100 overflow-auto"
			onMouseDown={(e) => e.preventDefault()}
		>
			<ul className="flex flex-col gap-2">
				{items.map((item, index) => (
					<MultiSelectOption
						key={item.id}
						item={item}
						isFocused={selectedIndex === index}
						handleListItemClick={handleListItemClick}
					/>
				))}
			</ul>
		</div>
	);
};

export default MultiSelectOptions;