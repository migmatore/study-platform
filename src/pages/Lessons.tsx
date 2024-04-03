import {useParams} from "react-router-dom";
import LessonItem from "../components/LessonItem/LessonItem.tsx";
import CreateLessonDialogBtn from "../components/CreateLessonDialogBtn/CreateLessonDialogBtn.tsx";
import useLessons from "../hooks/useLessons.tsx";
import BackBtn from "../components/BackBtn/BackBtn.tsx";
import {ImSpinner2} from "react-icons/im";

type Params = {
	classroomId: string;
}

const Lessons = () => {
	const {classroomId} = useParams<Params>();

	const {lessons, fetchError, isLoading} = useLessons();

	//const [lessons, setLessons] = useState<ILessonsResp[]>();

	// useEffect(() => {
	// 	const getLessons = async () => {
	// 		try {
	// 			const resp = await classroomService.getLessons(classroomId!.toString());
	// 			console.log(resp.data);
	// 			if (!ignore) {
	// 				setLessons(resp.data.map(el => {
	// 					return {
	// 						id: el.id,
	// 						title: el.title,
	// 						classroomId: el.classroomId,
	// 						content: el.content,
	// 						active: el.active,
	// 					};
	// 				}));
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	//
	// 	let ignore = false;
	//
	// 	getLessons().catch(console.error);
	//
	// 	return () => {
	// 		ignore = true;
	// 	};
	// }, []);

	// useEffect(() => {
	// 	fetchLessons(classroomId!).catch(console.error)
	// }, [classroomId]);

	return (
		<div className="w-full h-full m-4">
			<div className="flex mb-4 gap-4 items-center">
				<div className="flex flex-col gap-2">
					<div className="flex gap-4 items-center">
						<BackBtn/>
						<h1 className="text-2xl text-foreground">Список уроков</h1>
					</div>
					<p className="text-muted-foreground">Количество: {lessons.length}</p>
				</div>
			</div>
			{isLoading ? (
				<div className="w-full h-full flex justify-center items-center">
					<ImSpinner2 className="text-muted-foreground w-8 h-8 animate-spin"/>
				</div>
			) : (
				 fetchError ? (
					 <div className="flex flex-col w-full bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
						 <h3 className="text-lg">Ошибка</h3>
						 <p>{fetchError}</p>
					 </div>
				 ) : (
					 <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">


						 <CreateLessonDialogBtn classroomId={classroomId!}/>
						 {lessons?.map(lesson =>
							 <LessonItem key={lesson.id}
										 id={lesson.id}
										 classroomId={classroomId!}
										 title={lesson.title}
										 active={lesson.active}/>)}


					 </div>
				 )
			)}
		</div>
	);
};

export default Lessons;
