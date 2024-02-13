import useDesigner from "../../hooks/useDesigner.tsx";
import {LessonElements} from "../LessonElements/LessonElements.tsx";
import {X} from "lucide-react";
import {Separator} from "../ui/Separator/Separator.tsx";

const PropertiesFormSidebar = () => {
	const {selectedElement, setSelectedElement} = useDesigner();

	if (!selectedElement) return null;

	const PropertiesForm = LessonElements[selectedElement?.type].propertiesComponent;

	return (
		<div className="flex flex-col p-2">
			<div className="flex justify-between items-center mb-4">
				<div className="flex justify-center items-center text-base">
					Свойства элемента
				</div>
				<button className="inline-flex items-center justify-center"
						onClick={() => setSelectedElement(null)}
				>
					<X size={20}/>
				</button>
			</div>
			<Separator className="mb-4"/>
			<PropertiesForm elementInstance={selectedElement}/>
		</div>
	);
};

export default PropertiesFormSidebar;