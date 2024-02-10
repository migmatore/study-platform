import {TextFieldLessonElement} from "./TextField.tsx";

export type ElementsType = "TextField";

export type LessonElement = {
	type: ElementsType;

	construct: (id: string) => FormElementIstance;

	designerBtnElement: {
		icon: React.ElementType;
		label: string;
	}

	designerComponent: React.FC;
	lessonComponent: React.FC;
	propertiesComponent: React.FC;
};

export type FormElementIstance = {
	id: string;
	type: ElementsType;
	extraAttributes?: Record<string, any>;
}

type LessonElementsType = {
	[key in ElementsType]: LessonElement;
}

export const LessonElements: LessonElementsType = {
	TextField: TextFieldLessonElement
}