import {ElementsType, IDesignerComponentProps, LessonElement, LessonElementInstance} from "./LessonElements.tsx";
import {MdTextFields} from "react-icons/md";

const type: ElementsType = "TextField";

const extraAttributes = {
	label: "Text field",
	helperText: "Helper text",
	required: false,
	placeHolder: "Value here...",
}

export const TextFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: MdTextFields,
		label: "Text field",
	},
	designerComponent: DesignerComponent,
	lessonComponent: () => <div>Lesson component</div>,
	propertiesComponent: () => <div>Properties component</div>,
}

type CustomInstance = LessonElementInstance & {
	extraAttributes: typeof extraAttributes,
}

function DesignerComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const { label, required, placeHolder, helperText } = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full">
			<p>
				{label}
				{required && "*"}
			</p>
			<input readOnly disabled placeholder={placeHolder}/>
		</div>
	);
}