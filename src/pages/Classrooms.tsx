import classroomService from "../services/classroom.service.ts";
import {useEffect, useState} from "react";
import {IClassroomResp} from "../types/classroom.ts";
import ClassroomItem from "../components/ClassroomItem/ClassroomItem.tsx";
import {Plus} from "lucide-react";
import Button from "../components/Button/Button.tsx";

const Classrooms = () => {
	const [classrooms, setClassrooms] = useState<IClassroomResp[]>()

	useEffect(() => {
		const getClassrooms = async () => {
			try {
				const resp = await classroomService.getClassrooms();
				console.log(resp.data)
				if (!ignore) {
					setClassrooms(resp.data);
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
			<div className="flex mb-4 text-2xl justify-between">
				<h1>Список классов</h1>
				<Button className="text-white bg-emerald-400 hover:bg-emerald-400"><Plus size={20}/></Button>
			</div>
			<div className="flex flex-col space-y-4">
				{classrooms?.map(classroom =>
					<ClassroomItem key={classroom.id}
								   id={classroom.id}
								   title={classroom.title}
								   description={classroom.description}/>)}
			</div>
		</div>
	);
}

export default Classrooms;