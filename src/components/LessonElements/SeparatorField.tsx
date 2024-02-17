import {
	ElementsType,
	IDesignerComponentProps,
	IPropertiesComponentProps,
	LessonElement,
} from "./LessonElements.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "../../hooks/useDesigner.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
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
		label: "Separator field",
	},
	designerComponent: DesignerComponent,
	lessonComponent: LessonComponent,
	propertiesComponent: PropertiesComponent,
};

function DesignerComponent({elementInstance}: IDesignerComponentProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">
				Separator field
			</Label>
			<Separator/>
		</div>
	);
}

function LessonComponent({elementInstance}: IDesignerComponentProps) {
	return <Separator/>;
}

function PropertiesComponent({elementInstance}: IPropertiesComponentProps) {
	return <p>No properties for this element</p>;
}