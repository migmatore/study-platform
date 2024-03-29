import {TextFieldLessonElement} from "./TextField.tsx";
import {TitleFieldLessonElement} from "./TitleField.tsx";
import {SubtitleFieldLessonElement} from "./SubtitleField.tsx";
import {ParagraphFieldLessonElement} from "./ParahraphField.tsx";
import {SeparatorFieldLessonElement} from "./SeparatorField.tsx";
import {SpacerFieldLessonElement} from "./SpacerField.tsx";

export type ElementsType =
	"TextField"
	| "TitleField"
	| "SubtitleField"
	| "ParagraphField"
	| "SeparatorField"
	| "SpacerField";

export interface IDesignerComponentProps {
	elementInstance: LessonElementInstance;
}

export interface ILessonComponentProps {
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
	lessonComponent: React.FC<ILessonComponentProps>;
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
	TextField: TextFieldLessonElement,
	TitleField: TitleFieldLessonElement,
	SubtitleField: SubtitleFieldLessonElement,
	ParagraphField: ParagraphFieldLessonElement,
	SeparatorField: SeparatorFieldLessonElement,
	SpacerField: SpacerFieldLessonElement,
};