import Designer from "../components/Designer/Designer.tsx";
import {useParams} from "react-router-dom";
import {DndContext, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import DragOverlayWrapper from "../components/DragOverlayWrapper/DragOverlayWrapper.tsx";
import PreviewDialogBtn from "../components/PreviewDialogBtn/PreviewDialogBtn.tsx";
import SaveLessonBtn from "../components/SaveLessonBtn/SaveLessonBtn.tsx";
import useLessons from "../hooks/useLessons.tsx";
import BackBtn from "../components/BackBtn/BackBtn.tsx";
import DesignerProvider from "../provider/DesignerProvider.tsx";
import DesignerSidebar from "../components/DesignerSidebar/DesignerSidebar.tsx";

type Params = {
	lessonId: string;
	classroomId: string;
}

const EditLesson = () => {
	const {lessonId, classroomId} = useParams<Params>();

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 5,
		},
	});
	const sensors = useSensors(mouseSensor);

	const {getLesson} = useLessons();

	const lesson = getLesson(Number(lessonId));

	return (
		<DesignerProvider>
			<DndContext sensors={sensors}>
				<div className="w-full h-full flex flex-col">
					<div className="flex p-4 border-b items-center gap-4 bg-background sticky top-0 z-50">
						<div className="w-full flex flex-col">
							<div className="flex gap-4">
								<BackBtn/>
								<h1 className="text-2xl">Конструктор уроков</h1>
							</div>
							<div className="flex justify-between items-center">
								<p className="text-muted-foreground">Урок: {lesson?.title}</p>
								<div className="flex gap-2">
									<PreviewDialogBtn/>
									<SaveLessonBtn lessonId={lessonId!} classroomId={classroomId!}/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex w-full">
						<div className="w-full">
							<div
								className="w-full h-full flex flex-col flex-grow items-center justify-center bg-background
					overflow-y-auto bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]">
								<Designer/>
							</div>
						</div>
						<div className="h-[calc(100vh-101px)] w-[400px] sticky top-[101px] overflow-y-scroll">
							<DesignerSidebar/>
						</div>
					</div>
				</div>
				<DragOverlayWrapper/>
			</DndContext>
		</DesignerProvider>
	);
};

export default EditLesson;