import {LessonElement} from "../LessonElements/LessonElements.tsx";
import Button from "../Button/Button.tsx";

interface Props {
	lessonElement: LessonElement
}


const SidebarBtnElementDragOverlay = ({lessonElement}: Props) => {
	const {label, icon: Icon} = lessonElement.designerBtnElement;

	return (
		<Button className="border flex flex-col justify-center hover:bg-blue-100 transition items-center gap-2
			h-[120px] w-[120px] cursor-grab">
			<Icon className="h-8 w-8 cursor-grab"/>
			<p className="text-xs">{label}</p>
		</Button>
	)
}

export default SidebarBtnElementDragOverlay;