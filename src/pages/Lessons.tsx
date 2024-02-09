import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import classroomService from "../services/classroom.service.ts";
import {ILessonsResp} from "../types/lesson.ts";
import LessonItem from "../components/LessonItem/LessonItem.tsx";

type Params = {
	id: string;
}

const Lessons = () => {
	const { id } = useParams<Params>()

	const [lessons, setLessons] = useState<ILessonsResp[]>()

	useEffect(() => {
		const getLessons = async () => {
			try {
				const resp = await classroomService.getLessons(id!.toString());
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
	}, [id]);

	return (
		<div className="w-full h-full m-4">
			<div className="mb-4 text-2xl">
				<h1>Список уроков</h1>
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
