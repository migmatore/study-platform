import classroomService from "../services/classroom.service.ts";
import {useEffect, useState} from "react";
import {IClassroomResp} from "../types/classroom.ts";
import ClassroomItem from "../components/ClassroomItem/ClassroomItem.tsx";

const Classrooms = () => {
	const [classrooms, setClassrooms] = useState<IClassroomResp[]>()

	useEffect(() => {
		const getClassrooms = async () => {
			try {
				const cs = await classroomService.getClassrooms();
				console.log(cs.data)
				if (!ignore) {
					setClassrooms(cs.data);
				}
			} catch (error) {
				console.log(error)
			}
		}

		let ignore = false;

		getClassrooms().catch(console.error);

		return () => {
			ignore = true;
		}
	}, []);

	return (
		<div className="w-full h-full m-4">
			<div className="mb-4 text-2xl">
				<h1>Список классов</h1>
			</div>
			<div className="flex flex-col space-y-4">
				{classrooms?.map(classroom =>
					<ClassroomItem key={classroom.id} title={classroom.title} description={classroom.description}/>)}
			</div>
		</div>
	);
}

export default Classrooms;