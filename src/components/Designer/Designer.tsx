import DesignerSidebar from "../DesignerSidebar/DesignerSidebar.tsx";
import {DragEndEvent, useDndMonitor, useDroppable} from "@dnd-kit/core";
import {cn} from "../../utils";
import useDesigner from "../../hooks/useDesigner.tsx";
import {ElementsType, LessonElements} from "../LessonElements/LessonElements.tsx";
import {v4 as uuidv4} from "uuid"
import DesignerElementWrapper from "./DesignerElementWrapper.tsx";

const Designer = () => {
	const {elements, addElement, selectedElement, setSelectedElement} = useDesigner();

	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		}
	});

	useDndMonitor({
		onDragEnd(event: DragEndEvent) {
			const {active, over} = event;

			if (!active || !over) return;

			const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

			if (isDesignerBtnElement) {
				const type = active.data?.current?.type;
				const newElement = LessonElements[type as ElementsType].construct(uuidv4());

				addElement(0, newElement);
				console.log(newElement);
			}
		}
	});

	return (
		<div className="flex w-full h-full gap-3">
			<div className="p-4 w-full"
				 onClick={() => {
					 if (selectedElement) setSelectedElement(null);
				 }}
			>
				<div ref={droppable.setNodeRef}
					className={cn("bg-white border max-w-[920px] h-full m-auto rounded-lg flex flex-col " +
						"flex-grow items-center justify-start flex-1 overflow-y-auto",
						droppable.isOver && "ring-1 ring-blue-500"
					)}>
					{!droppable.isOver && elements.length === 0 && (
						<p className="text-3xl flex flex-grow items-center font-bold">
							Перетащить сюда
						</p>
					)}
					{droppable.isOver && elements.length === 0 && (
						<div className="p-4 w-full">
							<div className="h-[120px] rounded-lg bg-gray-100"></div>
						</div>
					)}
					{elements.length > 0 && (
						<div className="flex flex-col w-full gap-2 p-4">
							{elements.map(element => (
								<DesignerElementWrapper key={element.id} element={element}/>
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar/>
		</div>
	)
}

export default Designer;