import {MouseEvent} from 'react';

type MultiSelectChipProps = {
	id: number;
	label: string;
	remove: (e: MouseEvent<HTMLButtonElement>, id: number) => void;
	shouldHighlight: boolean;
};

const MultiSelectChip = ({id, label, remove, shouldHighlight}: MultiSelectChipProps) => {
	return (
		<div
			key={id}
			className={`rounded-md border-1 
                flex flex-none justify-between items-center
                gap-2 text-[#6b7280] text-sm h-full
                font-medium cursor-pointer p-1
                ${shouldHighlight ? "bg-gray-800 text-white" : "bg-gray-100"}`}
		>
			<div>
				<span className="px-1 py-2">{label}</span>
			</div>
			<button
				className="hover:bg-stone-200 flex
                 hover:text-red-500 px-1"
				onClick={(e) => remove(e, id)}
			>
				x
			</button>
		</div>
	);
};

export default MultiSelectChip;