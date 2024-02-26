import classroomService from "../services/classroom.service.ts";
import {useEffect, useState} from "react";
import {IClassroomResp} from "../types/classroom.ts";
import ClassroomItem from "../components/ClassroomItem/ClassroomItem.tsx";
import CreateClassroomDialogBtn from "../components/CreateClassroomDialogBtn/CreateClassroomDialogBtn.tsx";

const Classrooms = () => {
	const [classrooms, setClassrooms] = useState<IClassroomResp[]>();

	useEffect(() => {
		const getClassrooms = async () => {
			try {
				const resp = await classroomService.getClassrooms();
				console.log(resp.data);
				if (!ignore) {
					setClassrooms(resp.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		let ignore = false;

		getClassrooms().catch(console.error);

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<h1 className="text-2xl text-foreground">Список классов</h1>
				<p className="text-muted-foreground">Количество: {classrooms?.length}</p>
			</div>
			<div className="flex flex-col space-y-4">
				<CreateClassroomDialogBtn/>
				{classrooms?.map(classroom =>
					<ClassroomItem key={classroom.id}
								   id={classroom.id}
								   title={classroom.title}
								   description={classroom.description}/>)}
			</div>
		</div>
	);
};

export default Classrooms;