import {ElementsType, LessonElement} from "./LessonElements.tsx";
import {MdTextFields} from "react-icons/md";

const type: ElementsType = "TextField";

export const TextFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes: {
			label: "Text field",
			helperText: "Helper text",
			required: false,
			placeHolder: "Value here...",
		}
	}),
	designerBtnElement: {
		icon: MdTextFields,
		label: "Text field",
	},
	designerComponent: () => <div>Designer component</div>,
	lessonComponent: () => <div>Lesson component</div>,
	propertiesComponent: () => <div>Properties component</div>,
}