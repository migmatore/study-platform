import {LessonElementInstance, LessonElements} from "../LessonElements/LessonElements.tsx";

interface Props {
	element: LessonElementInstance;
}

const DesignerElementWrapper = ({element}: Props) => {
	const DesignerElement = LessonElements[element.type].designerComponent;

	return <DesignerElement elementInstance={element}/>;
}

export default DesignerElementWrapper;