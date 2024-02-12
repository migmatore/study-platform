import Designer from "../components/Designer/Designer.tsx";
import {useParams} from "react-router-dom";
import {DndContext, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import DragOverlayWrapper from "../components/DragOverlayWrapper/DragOverlayWrapper.tsx";
import PreviewDialogBtn from "../components/PreviewDialogBtn/PreviewDialogBtn.tsx";
import SaveLessonBtn from "../components/SaveLessonBtn/SaveLessonBtn.tsx";

type Params = {
	lessonId: string;
}

const EditLesson = () => {
	const {lessonId} = useParams<Params>()

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	})
	const sensors = useSensors(mouseSensor)

	return (
		<DndContext sensors={sensors}>
			<div className="w-full flex flex-col">
				<div className="flex p-4 flex-col border-b">
					<h1 className="text-2xl dark:text-muted-foreground">Конструктор уроков</h1>
					<div className="flex justify-between items-center">
						<p>Урок: {lessonId}</p>
						<div className="flex gap-2">
							<PreviewDialogBtn/>
							<SaveLessonBtn/>
						</div>
					</div>
				</div>
				<div
					className="w-full h-[200px] flex flex-col flex-grow items-center justify-center bg-background
					overflow-y-auto bg-[url(/graph-paper.svg)]">
					<Designer/>
				</div>
			</div>
			<DragOverlayWrapper/>
		</DndContext>
	)
}

export default EditLesson;