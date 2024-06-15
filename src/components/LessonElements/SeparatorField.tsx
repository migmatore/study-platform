import {
	ElementsType,
	LessonElement,
} from "./LessonElements.tsx";
import {Label} from "../ui/Label/Label.tsx";
import {RiSeparator} from "react-icons/ri";
import {Separator} from "../ui/Separator/Separator.tsx";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
	}),
	designerBtnElement: {
		icon: RiSeparator,
		label: "Разделитель",
	},
	designerComponent: DesignerComponent,
	lessonComponent: LessonComponent,
	propertiesComponent: PropertiesComponent,
};

function DesignerComponent() {
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">
				Разделитель
			</Label>
			<Separator/>
		</div>
	);
}

function LessonComponent() {
	return <Separator/>;
}

function PropertiesComponent() {
	return <p>Нет свойств для этого элемента</p>;
}