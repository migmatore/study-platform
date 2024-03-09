import {LessonElement} from "../LessonElements/LessonElements.tsx";
import {useDraggable} from "@dnd-kit/core";
import {cn} from "../../utils";
import {Button} from "../ui/Button/Button.tsx";

interface Props {
	lessonElement: LessonElement;
}

const SidebarBtnElement = ({lessonElement}: Props) => {
	const {label, icon: Icon} = lessonElement.designerBtnElement;
	const draggable = useDraggable({
		id: `designer-btn-${lessonElement.type}`,
		data: {
			type: lessonElement.type,
			isDesignerBtnElement: true,
		},
	});

	return (
		<Button
			variant="outline"
			ref={draggable.setNodeRef}
			className={cn(
				"border transition-all duration-300 rounded-xl md:px-3 md:py-2 xl:px-5 xl:py-2.5 text-center text-sm " +
				"font-medium flex flex-col justify-center items-center gap-2 " +
				"md:h-[90px] md:w-[90px] lg:h-[90px] lg:w-[90px] xl:h-[120px] xl:w-[120px] cursor-grab",
				draggable.isDragging && "ring-1 ring-blue-500",
			)}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			<Icon className="h-8 w-8 cursor-grab"/>
			<p className="text-xs">{label}</p>
		</Button>
	);
};

export default SidebarBtnElement;