import {useNavigate, useParams} from "react-router-dom";
import useLessons from "../hooks/useLessons.tsx";
import {LessonElements} from "../components/LessonElements/LessonElements.tsx";
import BackBtn from "../components/BackBtn/BackBtn.tsx";
import {useEffect, useRef} from "react";

type Params = {
	classroomId: string;
	lessonId: string;
}

const Lesson = () => {
	const navigate = useNavigate();
	const {classroomId, lessonId} = useParams<Params>();
	const {getLesson, fetchLessons} = useLessons();

	useEffect(() => {
		fetchLessons(classroomId!).catch(console.error);
	}, [classroomId]);

	const lesson = getLesson(Number(lessonId));

	const ref = useRef<HTMLDivElement>(null);

	return (
		<div className="w-full flex flex-col">
			<div className="flex bg-background  p-4 border-b gap-4 items-center sticky top-0 z-50">
				<BackBtn/>
				<h1 className="text-2xl">Урок: {lesson?.title}</h1>
			</div>
			<div
				className="w-full h-full flex flex-col flex-grow items-center justify-center bg-background
					overflow-y-auto">
				{/*<div className="flex w-full h-full gap-3">*/}
				{/*	<div className="p-4 w-full">*/}
				{/*		<div className="bg-background border max-w-[920px] h-full m-auto rounded-lg flex flex-col*/}
				{/*			flex-grow items-center justify-start flex-1 overflow-y-auto p-8">*/}
				{/*			{lesson?.content?.map(element => {*/}
				{/*				const LessonComponent = LessonElements[element.type].lessonComponent;*/}

				{/*				return <LessonComponent key={element.id} elementInstance={element}/>;*/}
				{/*			})}*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
				<div className="w-full h-full">
					<div className="bg-background flex flex-col flex-grow items-center justify-center
					p-4 overflow-y-auto">
						<div className="max-w-[920px] flex flex-col gap-4 flex-grow bg-background border w-full rounded-lg p-8
						overflow-y-auto">
							<button onClick={() => {
								if (!ref.current) return;

								ref.current.scrollIntoView({ behavior: 'smooth', block: "center" });
								ref.current.style.borderColor = "#ff0000";
								ref.current.style.animation = "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite";

								setTimeout(() => {
									ref.current.style.borderColor = "hsl(var(--border))";
									ref.current.style.animation = "none";
								}, 3000)
							}}>
								go to
							</button>
							{lesson && lesson.content
							 ? lesson.content.map(element => {
									const LessonComponent = LessonElements[element.type].lessonComponent;

									return <LessonComponent key={element.id} elementInstance={element}/>;
								})
							 : <div>Error fetching lesson content</div>}
							<div className="w-full p-8 border flex flex-col">text element
								<div>test</div>
							</div>
							<div className="w-full p-8 border">text element</div>
							<div className="w-full p-8 border">text element</div>
							<div ref={ref} className="w-full p-8 border">text element</div>
							<div className="w-full p-8 border">text element</div>
							<div className="w-full p-8 border">text element</div>
							<div className="w-full p-8 border">text element</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Lesson;