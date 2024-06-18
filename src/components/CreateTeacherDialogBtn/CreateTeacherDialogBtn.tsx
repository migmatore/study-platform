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
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../ui/Input/Input.tsx";
import {ImSpinner2} from "react-icons/im";
import {useState} from "react";
import {AxiosError} from "axios";
import useTeachers from "../../hooks/useTeachers.tsx";

const phoneRegexp = new RegExp(/^((8|\+7)[\-_]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

const teacherSchema = z.object({
	fullName: z.string().min(1).max(100),
	phone: z.string().regex(phoneRegexp).optional(),
	email: z.string().email().max(50),
	password: z.string().min(8).max(100),
});

type teacherSchemaType = z.infer<typeof teacherSchema>;

const CreateTeacherDialogBtn = () => {
	const {createTeacher} = useTeachers();

	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<teacherSchemaType>({
		resolver: zodResolver(teacherSchema),
		mode: "onSubmit",
		defaultValues: {},
	});

	const handleCreateTeacher = async (values: teacherSchemaType) => {
		try {
			await createTeacher({
				fullName: values.fullName,
				phone: values.phone,
				email: values.email,
				password: values.password,
			});

			setOpen(false);
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 403:
					setError("Доступ запрещен");
					break;
				case 409:
					setError("Уже существует преподаватель с таким email");
					break;
				case 500:
					setError("Внутренняя ошибка сервера");
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full py-5 h-[78px] gap-2 border-2 border-dashed">
					<Plus className="w-8 h-8"/>
					<span className="text-lg">Создать преподавателя</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Создать аккаунт преподавателя
					</DialogTitle>
					<DialogDescription>
						Создайте аккаунт преподавателя, что бы он смог создавать классы и проводить занятия
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleCreateTeacher)} className="space-y-3">
						<FormField control={form.control}
								   name="fullName"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>ФИО</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="phone"
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Номер телефона</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="email"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Адрес электронной почты</FormLabel>
										   <FormControl>
											   <Input type="email" {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="password"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Пароль</FormLabel>
										   <FormControl>
											   <Input type="password"{...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				{error &&
                    <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                        <h3 className="text-lg">Ошибка создания аккаунта преподавателя</h3>
                        <p>{error}</p>
                    </div>
				}
				<DialogFooter>
					<Button onClick={form.handleSubmit(handleCreateTeacher)} className="w-full mt-4">
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

export default CreateTeacherDialogBtn;