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
import {LuHeading2} from "react-icons/lu";
import {Label} from "../ui/Label/Label.tsx";

const type: ElementsType = "SubtitleField";

const extraAttributes = {
	subtitle: "Subtitle field",
};

const propertiesSchema = z.object({
	subtitle: z.string().min(2, {message: "Должно быть минимум 2 символа"}).max(50),
});

export const SubtitleFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: LuHeading2,
		label: "Subtitle field",
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
	const {subtitle} = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">
				Subtitle field
			</Label>
			<p className="text-lg">{subtitle}</p>
		</div>
	);
}

function LessonComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {subtitle} = element.extraAttributes;

	return <p className="text-lg">{subtitle}</p>;
}

function PropertiesComponent({elementInstance}: IPropertiesComponentProps) {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			subtitle: element.extraAttributes.subtitle,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormSchemaType) => {
		const {subtitle} = values;

		updateElement(element.id, {
			...element,
			extraAttributes: {
				subtitle,
			},
		});
	};

	return <Form {...form}>
		<form onBlur={form.handleSubmit(applyChanges)}
			  onSubmit={(e) => e.preventDefault()}
			  className="space-y-3">
			<FormField control={form.control} name="subtitle" render={({field}) => (
				<FormItem>
					<FormLabel>Subitle</FormLabel>
					<FormControl>
						<Input {...field}
							   onKeyDown={(e) => {
								   if (e.key === "Enter") {
									   e.currentTarget.blur();
								   }
							   }}/>
					</FormControl>
					<FormMessage/>
				</FormItem>
			)}/>
		</form>
	</Form>;
}