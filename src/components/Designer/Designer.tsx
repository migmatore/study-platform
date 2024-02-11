import DesignerSidebar from "../DesignerSidebar/DesignerSidebar.tsx";
import {DragEndEvent, useDndMonitor, useDroppable} from "@dnd-kit/core";
import {cn} from "../../utils";
import useDesigner from "../../hooks/useDesigner.tsx";
import {ElementsType, LessonElements} from "../LessonElements/LessonElements.tsx";
import {v4 as uuidv4} from "uuid"
import DesignerElementWrapper from "./DesignerElementWrapper.tsx";

const Designer = () => {
	const {
		elements,
		addElement,
		selectedElement,
		setSelectedElement,
		removeElement,
	} = useDesigner();

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

			// First scenario
			const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
			const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

			const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

			if (droppingSidebarBtnOverDesignerDropArea) {
				const type = active.data?.current?.type;
				const newElement = LessonElements[type as ElementsType].construct(uuidv4());

				addElement(elements.length, newElement);
				return;
			}

			// Second scenario
			const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
			const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;

			const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf
				|| isDroppingOverDesignerElementBottomHalf;

			const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

			if (droppingSidebarBtnOverDesignerElement) {
				const type = active.data?.current?.type;
				const newElement = LessonElements[type as ElementsType].construct(uuidv4());

				const overId = over.data?.current?.elementId;

				const overElementIndex = elements.findIndex(el => el.id === overId);

				if (overElementIndex === -1) {
					throw new Error("element not found");
				}

				let newElementIndex = overElementIndex; // i assume i'm on top-half

				if (isDroppingOverDesignerElementBottomHalf) {
					newElementIndex = overElementIndex + 1
				}

				addElement(newElementIndex, newElement);
				return;
			}

			// Third scenario
			const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

			const draggingDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement
				&& isDraggingDesignerElement;

			if (draggingDesignerElementOverAnotherDesignerElement) {
				const activeId = active.data?.current?.elementId;
				const overId = over.data?.current?.elementId;

				const activeElementIndex = elements.findIndex(el => el.id === activeId)
				const overElementIndex = elements.findIndex(el => el.id === overId)

				if (activeElementIndex === -1 || overElementIndex === -1) {
					throw new Error("element not found")
				}

				const activeElement = {...elements[activeElementIndex]}

				removeElement(activeId);

				let newElementIndex = overElementIndex; // i assume i'm on top-half

				if (isDroppingOverDesignerElementBottomHalf) {
					newElementIndex = overElementIndex + 1
				}

				addElement(newElementIndex, activeElement);
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