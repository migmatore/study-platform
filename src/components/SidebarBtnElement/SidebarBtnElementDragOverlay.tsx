import {LessonElement} from "../LessonElements/LessonElements.tsx";
import {Button} from "../ui/Button/Button.tsx";

interface Props {
	lessonElement: LessonElement;
}

const SidebarBtnElementDragOverlay = ({lessonElement}: Props) => {
	const {label, icon: Icon} = lessonElement.designerBtnElement;

	return (
		<Button variant="outline"
				className="border transition-all duration-300 rounded-xl px-5 py-2.5 text-center text-sm font-medium
				flex flex-col justify-center items-center gap-2 h-[120px] w-[120px] cursor-grab">
			<Icon className="h-8 w-8 cursor-grab"/>
			<p className="text-xs text-muted-foreground">{label}</p>
		</Button>
	);
};

export default SidebarBtnElementDragOverlay;