import {LessonElements} from "../LessonElements/LessonElements.tsx";
import SidebarBtnElement from "../SidebarBtnElement/SidebarBtnElement.tsx";

const DesignerSidebar = () => {
	return (
		<aside className="h-full w-[400px] bg-white max-w-[400px] flex flex-col flex-grow gap-2 border-l p-4
			overflow-y-auto">
			Элементы
			<SidebarBtnElement lessonElement={LessonElements.TextField}/>
		</aside>
	)
}

export default DesignerSidebar;