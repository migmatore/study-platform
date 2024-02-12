import SidebarBtnElement from "../SidebarBtnElement/SidebarBtnElement.tsx";
import {LessonElements} from "../LessonElements/LessonElements.tsx";
import {Separator} from "../ui/Separator/Separator.tsx";

const LessonElementsSidebar = () => {
	return (
		<div className="p-2">
			<p className="text-lg mb-4">Элементы</p>
			<Separator className="my-2"/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
				<p className="text-sm col-span-1 md:col-span-2 my-2 place-self-start">
					Layout elements
				</p>
				<SidebarBtnElement lessonElement={LessonElements.TextField}/>
				<SidebarBtnElement lessonElement={LessonElements.TitleField}/>
			</div>
		</div>
	);
}

export default LessonElementsSidebar;