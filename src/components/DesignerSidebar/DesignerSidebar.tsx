import useDesigner from "../../hooks/useDesigner.tsx";
import LessonElementsSidebar from "../LessonElementsSidebar/LessonElementsSidebar.tsx";
import PropertiesFormSidebar from "../PropertiesDesignerSIdebar/PropertiesFormSidebar.tsx";

const DesignerSidebar = () => {
	const {selectedElement} = useDesigner();

	return (
		<aside className="h-full w-[400px] bg-background max-w-[400px] flex flex-col flex-grow gap-2 border-l p-4
			overflow-y-auto">
			{!selectedElement && <LessonElementsSidebar/>}
			{selectedElement && <PropertiesFormSidebar/>}
		</aside>
	);
}

export default DesignerSidebar;