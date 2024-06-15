import {useRef} from "react";

import MultiSelectOptions from "./MultiSelectOptions";
import MultiSelectChips from "./MultiSelectChips";
import {MultiSelectItem} from "./MultiSelectOption.tsx";
import useMultiSelect from "./useMultiSelect.tsx";
import {Input} from "../Input/Input.tsx";

const MultiSelect = ({
	itemsList,
	defaultSelectedItemsList,
	onChange,
}: {
	itemsList: MultiSelectItem[];
	defaultSelectedItemsList: MultiSelectItem[];
	onChange: (selectedItems: MultiSelectItem[]) => void;
}) => {
	const {
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
	} = useMultiSelect(itemsList, defaultSelectedItemsList, onChange);

	//ref
	const inputRef = useRef<HTMLInputElement>(null);

	const handleContainerClick = () => {
		console.log(selectedItems);

		if (!showList) {
			setShowList(true);
			inputRef.current?.focus();
		}
	};

	return (
		<div className="flex flex-col items-start justify-start w-full">
			<div
				className="rounded-md w-full
                    flex gap-2 justify-start items-center
                    flex-wrap p-1.5
                    bg-white
                    border border-input
                    focus-within:outline-blue-300 focus-within:outline-2 focus-within:outline"
				onClick={handleContainerClick}
			>
				<MultiSelectChips
					selectedItems={selectedItems}
					remove={remove}
					lastHightlight={lastHightlight}
				/>
				<Input
					ref={inputRef}
					type="text"
					id="search-input"
					name="search-input"
					className="min-w-[30%] flex-1 ml-1 border-none bg-none outline-none p-0.5 focus-visible:ring-0"
					placeholder="Начните писать или кликните и выберите из списка"
					value={searchValue}
					onChange={handleOnChange}
					onKeyDown={handleKeyDown}
					onBlur={() => setShowList(false)}
				/>
			</div>

			<div className="w-full">
				<MultiSelectOptions
					items={filteredItemsList}
					show={showList && filteredItemsList.length > 0}
					add={add}
					selectedIndex={selectedIndex}
					setShowList={setShowList}
				/>
			</div>
		</div>
	);
};

export default MultiSelect;