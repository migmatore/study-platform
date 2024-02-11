import SidebarBtnElement from "../SidebarBtnElement/SidebarBtnElement.tsx";
import {LessonElements} from "../LessonElements/LessonElements.tsx";

const LessonElementsSidebar = () => {
	return (
		<div className="p-2">
			<p className="text-lg mb-4">Элементы</p>
			<SidebarBtnElement lessonElement={LessonElements.TextField}/>
		</div>
	);
}

export default LessonElementsSidebar;