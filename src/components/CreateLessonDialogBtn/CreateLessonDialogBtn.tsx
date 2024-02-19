import {z} from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/Dialog/Dialog.tsx";
import {Button} from "../ui/Button/Button.tsx";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
import {ImSpinner2} from "react-icons/im";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "../ui/Switch/Switch.tsx";

const lessonSchema = z.object({
	title: z.string({required_error: "Это поле является обязательным"}).min(1).max(100),
	active: z.boolean().optional(),
});

type lessonSchemaType = z.infer<typeof lessonSchema>;

const CreateLessonDialogBtn = () => {
	const form = useForm<lessonSchemaType>({
		resolver: zodResolver(lessonSchema),
		mode: "onSubmit",
		defaultValues: {
			active: false,
		},
	});

	function createLesson(values: lessonSchemaType) {
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="py-5 h-full gap-2 border-2 border-dashed">
					<Plus className="w-8 h-8"/>
					<span className="text-lg">Создать класс</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Создать урок
					</DialogTitle>
					<DialogDescription>
						Создайте новый урок
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(createLesson)} className="space-y-3">
						<FormField control={form.control}
								   name="title"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Название урока</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="active"
								   render={({field}) => (
									   <FormItem className="flex items-center justify-between rounded-lg border p-3 space-y-0">
										   <div className="space-y-0.5">
											   <FormLabel>Активный урок</FormLabel>
										   </div>
										   <FormControl>
											   <Switch checked={field.value} onCheckedChange={field.onChange}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button onClick={form.handleSubmit(createLesson)}
							className="w-full mt-4">
						{!form.formState.isSubmitting && <span>Создать</span>}
						{form.formState.isSubmitting && (
							<ImSpinner2 className="animate-spin"/>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateLessonDialogBtn;