import {TextFieldLessonElement} from "./TextField.tsx";

export type ElementsType = "TextField";

export interface IDesignerComponentProps {
	elementInstance: LessonElementInstance;
}

export interface IPropertiesComponentProps {
	elementInstance: LessonElementInstance;
}

export type LessonElement = {
	type: ElementsType;

	construct: (id: string) => LessonElementInstance;

	designerBtnElement: {
		icon: React.ElementType;
		label: string;
	}

	designerComponent: React.FC<IDesignerComponentProps>;
	lessonComponent: React.FC;
	propertiesComponent: React.FC<IPropertiesComponentProps>;
};

export type LessonElementInstance = {
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