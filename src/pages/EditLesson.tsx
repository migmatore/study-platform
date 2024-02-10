import Designer from "../components/Designer/Designer.tsx";
import {useParams} from "react-router-dom";
import {DndContext} from "@dnd-kit/core";
import DragOverlayWrapper from "../components/DragOverlayWrapper/DragOverlayWrapper.tsx";

type Params = {
	lessonId: string;
}

const EditLesson = () => {
	const {lessonId} = useParams<Params>()

	return (
		<DndContext>
			<div className="w-full flex flex-col">
				<div className="flex p-4 flex-col border-b">
					<h1 className="text-2xl">Конструктор уроков</h1>
					<p>Урок: {lessonId}</p>
				</div>
				<div
					className="w-full h-[200px] flex flex-col flex-grow items-center justify-center bg-white relative
					overflow-y-auto bg-[url(/graph-paper.svg)]">
					<Designer/>
				</div>
			</div>
			<DragOverlayWrapper/>
		</DndContext>
	)
}

export default EditLesson;