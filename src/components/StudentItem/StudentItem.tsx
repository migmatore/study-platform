interface Props {
	id: number;
	fullName: string;
	email: string;
	classroomsId: Array<number>;
}

const StudentItem = ({id, fullName, email, classroomsId}: Props) => {
	return (
		<div className="flex justify-between border p-5 rounded-lg">
			<div>
				<h2 className="text-xl text-foreground">{fullName}</h2>
				<p className="mt-2.5 text-foreground">{email}</p>
			</div>
			<div>

			</div>
		</div>
	)
}

export default StudentItem;