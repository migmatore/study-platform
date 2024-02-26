import {useParams} from "react-router-dom";
import {useEffect} from "react";
import classroomService from "../services/classroom.service.ts";
import LessonItem from "../components/LessonItem/LessonItem.tsx";
import CreateLessonDialogBtn from "../components/CreateLessonDialogBtn/CreateLessonDialogBtn.tsx";
import useLessons from "../hooks/useLessons.tsx";

type Params = {
	classroomId: string;
}

const Lessons = () => {
	const {classroomId} = useParams<Params>();

	const {lessons, setLessons} = useLessons();

	//const [lessons, setLessons] = useState<ILessonsResp[]>();

	useEffect(() => {
		const getLessons = async () => {
			try {
				const resp = await classroomService.getLessons(classroomId!.toString());
				console.log(resp.data);
				if (!ignore) {
					setLessons(resp.data.map(el => {
						return {
							id: el.id,
							title: el.title,
							classroomId: el.classroomId,
							content: el.content,
							active: el.active,
						};
					}));
				}
			} catch (error) {
				console.log(error);
			}
		};

		let ignore = false;

		getLessons().catch(console.error);

		return () => {
			ignore = true;
		};
	}, []);

	if (!classroomId) return;

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<h1 className="text-2xl text-foreground">Список уроков</h1>
				<p className="text-muted-foreground">Количество: {lessons.length}</p>
			</div>
			<div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
				<CreateLessonDialogBtn classroomId={classroomId}/>
				{lessons?.map(lesson =>
					<LessonItem key={lesson.id}
								id={lesson.id}
								classroomId={classroomId}
								title={lesson.title}
								active={lesson.active}/>)}
			</div>
		</div>
	);
};

export default Lessons;
