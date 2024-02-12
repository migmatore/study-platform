import {
	ElementsType,
	IDesignerComponentProps,
	IPropertiesComponentProps,
	LessonElement,
	LessonElementInstance
} from "./LessonElements.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "../../hooks/useDesigner.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
import {LuHeading1} from "react-icons/lu";
import {Label} from "../ui/Label/Label.tsx";

const type: ElementsType = "TitleField";

const extraAttributes = {
	title: "Title field",
}

const propertiesSchema = z.object({
	title: z.string().min(2, {message: "Должно быть минимум 2 символа"}).max(50),
});

export const TitleFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: LuHeading1,
		label: "Title field",
	},
	designerComponent: DesignerComponent,
	lessonComponent: LessonComponent,
	propertiesComponent: PropertiesComponent,
}

type CustomInstance = LessonElementInstance & {
	extraAttributes: typeof extraAttributes,
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {title} = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="dark:text-muted-foreground">
				Title field
			</Label>
			<p className="text-2xl">{title}</p>
		</div>
	);
}

function LessonComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {title} = element.extraAttributes;

	return (
		<p className="text-2xl">{title}</p>
	);
}

function PropertiesComponent({elementInstance}: IPropertiesComponentProps) {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			title: element.extraAttributes.title,
		}
	})

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form])

	const applyChanges = (values: propertiesFormSchemaType) => {
		const {title} = values;

		updateElement(element.id, {
			...element,
			extraAttributes: {
				title,
			}
		});
	}

	return <Form {...form}>
		<form onBlur={form.handleSubmit(applyChanges)}
			  onSubmit={(e) => e.preventDefault()}
			  className="space-y-3">
			<FormField control={form.control} name="title" render={({field}) => (
				<FormItem>
					<FormLabel>Title</FormLabel>
					<FormControl>
						<Input {...field}
							   onKeyDown={(e) => {
								   if (e.key === "Enter") e.currentTarget.blur();
							   }}/>
					</FormControl>
					<FormMessage/>
				</FormItem>
			)}/>
		</form>
	</Form>
}