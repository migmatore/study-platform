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
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
import {TextArea} from "../ui/TextArea/TextArea.tsx";
import {ImSpinner2} from "react-icons/im";

const classroomSchema = z.object({
	title: z.string({required_error: "Это поле является обязательным"}).min(1).max(100),
	description: z.string().max(1000).optional(),
	maxStudents: z.coerce.number().int().min(1).max(100),
});

type classroomSchemaType = z.infer<typeof classroomSchema>;

const CreateClassroomDialogBtn = () => {
	const form = useForm<classroomSchemaType>({
		resolver: zodResolver(classroomSchema),
		mode: "onSubmit",
		defaultValues: {
			maxStudents: 1,
		},
	});

	function createClassroom(values: classroomSchemaType) {
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="py-5 h-[78px] gap-2 border-2 border-dashed">
					<Plus className="w-8 h-8"/>
					<span className="text-lg">Создать класс</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Создать класс
					</DialogTitle>
					<DialogDescription>
						Создайте новый класс, чтобы начать проводить уроки
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(createClassroom)} className="space-y-3">
						<FormField control={form.control}
								   name="title"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Название класса</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="description"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Описание класса</FormLabel>
										   <FormControl>
											   <TextArea rows={5} {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="maxStudents"
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Максимальное количество учеников</FormLabel>
										   <FormControl>
											   <Input  type="number" {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button onClick={form.handleSubmit(createClassroom)}
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

export default CreateClassroomDialogBtn;