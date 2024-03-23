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
import useClassrooms from "../../hooks/useClassrooms.tsx";
import {AxiosError} from "axios";
import {useState} from "react";

const classroomSchema = z.object({
	title: z.string({required_error: "Это поле является обязательным"}).min(1).max(100),
	description: z.string().max(1000).optional(),
	maxStudents: z.coerce.number().int().min(1).max(100),
});

type classroomSchemaType = z.infer<typeof classroomSchema>;

const CreateClassroomDialogBtn = () => {
	const {createClassroom} = useClassrooms();
	const [open, setOpen] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const form = useForm<classroomSchemaType>({
		resolver: zodResolver(classroomSchema),
		mode: "onSubmit",
		defaultValues: {
			maxStudents: 1,
		},
	});

	const handleCreateClassroom = async (values: classroomSchemaType) => {
		try {
			await createClassroom({
				title: values.title,
				description: values.description,
				maxStudents: values.maxStudents,
			});

			setOpen(false);
		} catch (e) {
			const error = e as AxiosError;

			if (error.response == undefined) return;

			switch (error.response.status) {
				case 400:
					setIsError(true);
					setError("Проверьте правильность введенных данных");
					break;
				case 401:
					setIsError(true);
					setError("Доступ запрещен");
					break;
				case 500:
					setIsError(true);
					setError("Внутренняя ошибка сервера");
					break;
				default:
					setIsError(true);
					setError("Неизвестная ошибка");
					break;
			}

			console.log(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
					<form onSubmit={form.handleSubmit(handleCreateClassroom)} className="space-y-3">
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
											   <Input type="number" {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				{isError &&
                    <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                        <h3 className="text-lg">Ошибка создания урока</h3>
                        <p>{error}</p>
                    </div>
				}
				<DialogFooter>
					<Button onClick={form.handleSubmit(handleCreateClassroom)}
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