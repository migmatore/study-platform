import {
	ElementsType,
	IDesignerComponentProps,
	IPropertiesComponentProps,
	LessonElement,
	LessonElementInstance,
} from "./LessonElements.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "../../hooks/useDesigner.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
import {LuSeparatorHorizontal} from "react-icons/lu";
import {Label} from "../ui/Label/Label.tsx";
import {Slider} from "../ui/Slider/Slider.tsx";

const type: ElementsType = "SpacerField";

const extraAttributes = {
	height: 20, // px
};

const propertiesSchema = z.object({
	height: z.number().min(5).max(200),
});

export const SpacerFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: LuSeparatorHorizontal,
		label: "Spacer field",
	},
	designerComponent: DesignerComponent,
	lessonComponent: LessonComponent,
	propertiesComponent: PropertiesComponent,
};

type CustomInstance = LessonElementInstance & {
	extraAttributes: typeof extraAttributes,
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {height} = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full items-center">
			<Label className="text-muted-foreground">
				Spacer field: {height} px
			</Label>
			<LuSeparatorHorizontal className="h-8 w-8"/>
		</div>
	);
}

function LessonComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {height} = element.extraAttributes;

	return <div style={{height, width: "100%"}}></div>;
}

function PropertiesComponent({elementInstance}: IPropertiesComponentProps) {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			height: element.extraAttributes.height,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormSchemaType) => {
		const {height} = values;

		updateElement(element.id, {
			...element,
			extraAttributes: {
				height,
			},
		});
	};

	return <Form {...form}>
		<form onBlur={form.handleSubmit(applyChanges)}
			  onSubmit={(e) => e.preventDefault()}
			  className="space-y-3">
			<FormField control={form.control} name="height" render={({field}) => (
				<FormItem>
					<FormLabel>Height (px): {form.watch("height")}</FormLabel>
					<FormControl>
						<Slider defaultValue={[field.value]} min={5} max={200} step={1} onValueChange={value => {
							field.onChange(value[0]);
						}}/>
					</FormControl>
					<FormMessage/>
				</FormItem>
			)}/>
		</form>
	</Form>;
}