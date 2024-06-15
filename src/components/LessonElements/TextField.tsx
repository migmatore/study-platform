import {
	ElementsType,
	IDesignerComponentProps,
	IPropertiesComponentProps,
	LessonElement,
	LessonElementInstance,
} from "./LessonElements.tsx";
import {MdTextFields} from "react-icons/md";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "../../hooks/useDesigner.tsx";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
import {Switch} from "../ui/Switch/Switch.tsx";

const type: ElementsType = "TextField";

const extraAttributes = {
	label: "Текстовое поле",
	helperText: "Текст для помощи",
	required: false,
	placeHolder: "Значение здесь...",
};

const propertiesSchema = z.object({
	label: z.string().min(2, {message: "Должно быть минимум 2 символа"}).max(50),
	helperText: z.string().max(200),
	required: z.boolean().default(false),
	placeHolder: z.string().max(50),
});

export const TextFieldLessonElement: LessonElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: MdTextFields,
		label: "Текстовое поле",
	},
	designerComponent: DesignerComponent,
	lessonComponent: LessonComponent,
	propertiesComponent: PropertiesComponent,
};

type CustomInstance = LessonElementInstance & {
	extraAttributes: typeof extraAttributes,
}

function DesignerComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {label, required, placeHolder, helperText} = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full">
			<p>
				{label}
				{required && "*"}
			</p>
			<input readOnly disabled placeholder={placeHolder}
				   className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/>
			{helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
		</div>
	);
}

function LessonComponent({elementInstance}: IDesignerComponentProps) {
	const element = elementInstance as CustomInstance;
	const {label, required, placeHolder, helperText} = element.extraAttributes;

	return (
		<div className="flex flex-col gap-2 w-full">
			<p>
				{label}
				{required && "*"}
			</p>
			<input placeholder={placeHolder}
				   className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm
				   transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium
				   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1
				   focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"/>
			<p className="text-muted-foreground text-sm">{helperText}</p>
		</div>
	);
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({elementInstance}: IPropertiesComponentProps) {
	const element = elementInstance as CustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
			placeHolder: element.extraAttributes.placeHolder,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormSchemaType) => {
		const {label, helperText, placeHolder, required} = values;

		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				placeHolder,
				required,
			},
		});
	};

	return <Form {...form}>
		<form onBlur={form.handleSubmit(applyChanges)}
			  onSubmit={(e) => e.preventDefault()}
			  className="space-y-3">
			<FormField control={form.control} name="label" render={({field}) => (
				<FormItem>
					<FormLabel>Label</FormLabel>
					<FormControl>
						<Input {...field}
							   onKeyDown={(e) => {
								   if (e.key === "Enter") {
									   e.currentTarget.blur();
								   }
							   }}/>
					</FormControl>
					<FormDescription>
						The label of the field. <br/> It will be displayed above the field.
					</FormDescription>
					<FormMessage/>
				</FormItem>
			)}/>
			<FormField control={form.control} name="placeHolder" render={({field}) => (
				<FormItem>
					<FormLabel>Placeholder</FormLabel>
					<FormControl>
						<Input {...field}
							   onKeyDown={(e) => {
								   if (e.key === "Enter") {
									   e.currentTarget.blur();
								   }
							   }}/>
					</FormControl>
					<FormDescription>
						The placeholder of the field.
					</FormDescription>
					<FormMessage/>
				</FormItem>
			)}/>
			<FormField
				control={form.control}
				name="helperText"
				render={({field}) => (
					<FormItem>
						<FormLabel>Helper text</FormLabel>
						<FormControl>
							<Input
								{...field}
								onKeyDown={(e) => {
									if (e.key === "Enter") e.currentTarget.blur();
								}}
							/>
						</FormControl>
						<FormDescription>
							The helper text of the field. <br/>
							It will be displayed below the field.
						</FormDescription>
						<FormMessage/>
					</FormItem>
				)}
			/>
			<FormField control={form.control} name="required" render={({field}) => (
				<FormItem className="flex items-center justify-between rounded-lg border p-3">
					<div className="space-y-0.5">
						<FormLabel>Required</FormLabel>
						<FormDescription>
							Is field required.
						</FormDescription>
					</div>
					<FormControl>
						<Switch checked={field.value} onCheckedChange={field.onChange}/>
					</FormControl>
					<FormMessage/>
				</FormItem>
			)}/>
		</form>
	</Form>;
}