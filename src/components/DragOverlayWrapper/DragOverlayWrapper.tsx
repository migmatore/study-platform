import {Active, DragOverlay, DragStartEvent, useDndMonitor} from "@dnd-kit/core";
import {useState} from "react";
import SidebarBtnElementDragOverlay from "../SidebarBtnElement/SidebarBtnElementDragOverlay.tsx";
import {ElementsType, LessonElements} from "../LessonElements/LessonElements.tsx";

const DragOverlayWrapper = () => {
	const [draggedItem, setDraggedItem] = useState<Active | null>(null);

	useDndMonitor({
		onDragStart(event: DragStartEvent) {
			setDraggedItem(event.active);
		},
		onDragCancel() {
			setDraggedItem(null);
		},
		onDragEnd() {
			setDraggedItem(null);
		}
	});

	if (!draggedItem) return null;

	let node = <div>Overlay</div>;
	const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

	if (isSidebarBtnElement) {
		const type = draggedItem.data?.current?.type as ElementsType;
		node = <SidebarBtnElementDragOverlay lessonElement={LessonElements[type]}/>
	}

	return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper;