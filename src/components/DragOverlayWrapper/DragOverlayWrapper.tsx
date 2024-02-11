import {Active, DragOverlay, DragStartEvent, useDndMonitor} from "@dnd-kit/core";
import {useState} from "react";
import SidebarBtnElementDragOverlay from "../SidebarBtnElement/SidebarBtnElementDragOverlay.tsx";
import {ElementsType, LessonElements} from "../LessonElements/LessonElements.tsx";
import useDesigner from "../../hooks/useDesigner.tsx";

const DragOverlayWrapper = () => {
	const {elements} = useDesigner();
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
	const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement as boolean | null;

	if (isSidebarBtnElement) {
		const type = draggedItem.data?.current?.type as ElementsType;
		node = <SidebarBtnElementDragOverlay lessonElement={LessonElements[type]}/>;
	}

	const isDesignerElement = draggedItem.data?.current?.isDesignerElement  as boolean | null;

	if (isDesignerElement) {
		const elementId = draggedItem.data?.current?.elementId as string;
		const element = elements.find(el => el.id === elementId);
		if (!element) {
			node = <div>Element not found!</div>;
		} else {
			const DesignerElementComponent = LessonElements[element.type].designerComponent;

			node = <div className="flex bg-white ring-1 ring-gray-100 rounded-lg h-[120px] w-full py-2 px-4 opacity-80
				pointer-events-none">
				<DesignerElementComponent elementInstance={element}/>
			</div>
		}
	}

	return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper;