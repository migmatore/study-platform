interface ClassroomItemProps {
	title: string;
	description: string;
}

const ClassroomItem = ({title, description}: ClassroomItemProps) => {
	return (
		<div className="flex justify-between border p-5 rounded-lg">
			<div>
				<h2 className="text-xl">{title}</h2>
				{description && <p className="mt-2.5">{description}</p>}
			</div>
			<div className="flex justify-center items-center">
				<button>Перейти</button>
			</div>
		</div>
	);
}

export default ClassroomItem;