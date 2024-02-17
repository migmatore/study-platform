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
import {Label} from "../ui/Label/Label.tsx";
import {BsTextParagraph} from "react-icons/bs";
import {TextArea} from "../ui/TextArea/TextArea.tsx";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
	text: "Text here",
};

const propertiesSchema = z.object({
	text: z.string().min(1, {message: "Должно быть минимум 1 символ"}).max(500),
});

export const ParagraphFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: BsTextParagraph,
		label: "Paragraph field",
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
	const {text} = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">
				Paragraph field
			</Label>
			<p>{text}</p>
		</div>
	);
}

function LessonComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {text} = element.extraAttributes;

	return <p>{text}</p>;
}

function PropertiesComponent({elementInstance}: IPropertiesComponentProps) {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			text: element.extraAttributes.text,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormSchemaType) => {
		const {text} = values;

		updateElement(element.id, {
			...element,
			extraAttributes: {
				text,
			},
		});
	};

	return <Form {...form}>
		<form onBlur={form.handleSubmit(applyChanges)}
			  onSubmit={(e) => e.preventDefault()}
			  className="space-y-3">
			<FormField control={form.control} name="text" render={({field}) => (
				<FormItem>
					<FormLabel>Text</FormLabel>
					<FormControl>
						<TextArea {...field}
								  rows={5}
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