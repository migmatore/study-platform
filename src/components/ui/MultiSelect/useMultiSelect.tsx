import {ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useState} from "react";
import {MultiSelectItem} from "./MultiSelectOption.tsx";

const useMultiSelect = (
	itemsList: MultiSelectItem[],
	defaultSelectedItemsList: MultiSelectItem[],
	onChange: (selectedItems: MultiSelectItem[]) => void,
) => {
	const [searchValue, setSearchValue] = useState("");
	const [filteredItemsList, setFilteredItemList] = useState<MultiSelectItem[]>([]);

	const [selectedItems, setSelectedItems] = useState<MultiSelectItem[]>(defaultSelectedItemsList);

	const [showList, setShowList] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [lastHightlight, setLastHightlight] = useState(false);

	const upHandler = () => {
		setSelectedIndex((i) => (i - 1 >= 0 ? i - 1 : filteredItemsList.length - 1));
	};

	const downHandler = () => {
		setSelectedIndex((i) => (i < filteredItemsList.length - 1 ? i + 1 : 0));
	};

	const enterHandler = (ctrlKey: boolean) => {
		if (filteredItemsList.length <= 0) return;
		if (searchValue.length === 0 && !showList) {
			setShowList(true);
			return;
		}
		setSelectedItems((state) => [...state, filteredItemsList[selectedIndex]]);
		setSearchValue("");
		setShowList(ctrlKey);
	};

	const backspaceHandler = () => {
		if (searchValue.length === 0 && selectedItems.length > 0) {
			if (!lastHightlight) {
				setLastHightlight(true);
			} else {
				setSelectedItems((products) => products.slice(0, -1));
				setLastHightlight(false);
			}
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case "ArrowUp":
				e.preventDefault();
				upHandler();
				return true;

			case "ArrowDown":
				e.preventDefault();
				downHandler();
				return true;

			case "Enter":
				console.log(e);
				e.preventDefault();
				enterHandler(e.ctrlKey);
				return true;

			case "Backspace":
				backspaceHandler();
				return true;

			default:
				return true;
		}
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setSelectedIndex(0);
		setShowList(true);
	};

	const remove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		e.stopPropagation();
		setSelectedItems((list) => list.filter((l) => l.id !== id));
		onChange(selectedItems.filter((l) => l.id !== id));
	};

	const add = (item: MultiSelectItem) => {
		setSelectedItems((state) => [...state, item]);
		setSearchValue("");
		onChange([...selectedItems, item]);
	};

	const validfilteredList = useMemo(
		() => itemsList.filter((item1) => !selectedItems.some((item2) => item1.id == item2.id)),
		[selectedItems],
	);

	useEffect(() => {
		if (searchValue.length == 0) {
			setFilteredItemList(validfilteredList);
			return;
		}
		const filteredList = validfilteredList.filter((option) =>
			option.label.toLocaleLowerCase().includes(searchValue.toLowerCase()),
		);
		setFilteredItemList(filteredList);
	}, [searchValue, validfilteredList]);

	return {
		showList,
		setShowList,
		selectedItems,
		remove,
		add,
		lastHightlight,
		searchValue,
		handleKeyDown,
		handleOnChange,
		filteredItemsList,
		selectedIndex,
	};
};

export default useMultiSelect;