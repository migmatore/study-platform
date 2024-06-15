import {MouseEvent} from "react";
import MultiSelectChip from "./MultiSelectChip";
import {MultiSelectItem} from "./MultiSelectOption.tsx";

type MultiSelectChipsProps = {
	selectedItems: MultiSelectItem[];
	remove: (e: MouseEvent<HTMLButtonElement>, id: number) => void;
	lastHightlight: boolean;
};

const MultiSelectChips = ({selectedItems, remove, lastHightlight}: MultiSelectChipsProps) => {
	return selectedItems.map((item, index) => (
		<MultiSelectChip
			id={item.id}
			label={item.label}
			remove={remove}
			key={item.id}
			shouldHighlight={lastHightlight && index === selectedItems.length - 1}
		/>
	));
};

export default MultiSelectChips;