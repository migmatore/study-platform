import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import classroomService from "../services/classroom.service.ts";
import {ILessonsResp} from "../types/lesson.ts";
import LessonItem from "../components/LessonItem/LessonItem.tsx";
import {Plus} from "lucide-react";
import Button from "../components/Button/Button.tsx";

type Params = {
	classroomId: string;
}

const Lessons = () => {
	const { classroomId } = useParams<Params>()

	const [lessons, setLessons] = useState<ILessonsResp[]>()

	useEffect(() => {
		const getLessons = async () => {
			try {
				const resp = await classroomService.getLessons(classroomId!.toString());
				console.log(resp.data)
				if (!ignore) {
					setLessons(resp.data);
				}
			} catch (error) {
				console.log(error)
			}
		}

		let ignore = false;

		getLessons().catch(console.error);

		return () => {
			ignore = true;
		}
	}, [classroomId]);

	return (
		<div className="w-full h-full m-4">
			<div className="flex mb-4 text-2xl justify-between">
				<h1>Список уроков</h1>
				<Button className="text-white bg-teal-400 hover:bg-teal-500"><Plus size={20}/></Button>
			</div>
			<div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
				{lessons?.map(lesson =>
					<LessonItem key={lesson.id}
								id={lesson.id}
								title={lesson.title}
								active={lesson.active}/>)}
			</div>
		</div>
	);
}

export default Lessons;
