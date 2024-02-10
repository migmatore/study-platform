import {LessonElement} from "../LessonElements/LessonElements.tsx";
import Button from "../Button/Button.tsx";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "../../utils";

interface Props {
	lessonElement: LessonElement
}

const SidebarBtnElement = ({lessonElement}: Props) => {
	const {label, icon: Icon} = lessonElement.designerBtnElement;
	const draggable = useDraggable({
		id: `designer-btn-${lessonElement.type}`,
		data: {
			type: lessonElement.type,
			isDesignerBtnElement: true,
		},
	})

	return (
		<Button
			ref={draggable.setNodeRef}
			className={cn("border flex flex-col justify-center hover:bg-blue-100 transition items-center gap-2 " +
				"h-[120px] w-[120px] cursor-grab", draggable.isDragging && "ring-1 ring-blue-500")}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			<Icon className="h-8 w-8 cursor-grab"/>
			<p className="text-xs">{label}</p>
		</Button>
	)
}

export default SidebarBtnElement;