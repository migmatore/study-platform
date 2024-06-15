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
import MultiSelect from "../ui/MultiSelect/MultiSelect.tsx";
import {useEffect, useRef, useState} from "react";
import {MultiSelectItem} from "../ui/MultiSelect/MultiSelectOption.tsx";
import classroomService from "../../services/classroom.service.ts";
import {AxiosError} from "axios";
import useStudents from "../../hooks/useStudents.tsx";

const phoneRegexp = new RegExp(/^((8|\+7)[\-_]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

const studentSchema = z.object({
	fullName: z.string().min(1).max(100),
	phone: z.string().regex(phoneRegexp).optional(),
	email: z.string().email().max(50),
	password: z.string().min(8).max(100),
	classrooms: z.object({id: z.number(), label: z.string()}).array().min(1, "Нужно выбрать хотя бы один класс"),
});

type studentSchemaType = z.infer<typeof studentSchema>;

const CreateStudentDialogBtn = () => {
	const {createStudent} = useStudents();

	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<studentSchemaType>({
		resolver: zodResolver(studentSchema),
		mode: "onSubmit",
		defaultValues: {},
	});

	const [items, setItems] = useState<MultiSelectItem[]>([]);

	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getClassrooms = async () => {
			try {
				const resp = await classroomService.getClassrooms();

				if (resp.status === 200) {
					setItems(resp.data.map((item) => ({id: item.id, label: item.title})));
				}
			} catch (e) {
				const error = e as AxiosError;
				//setFetchError("Ошибка получения классов");
				console.log(error);
			}
		};

		getClassrooms().catch(console.error);
	}, []);


	const handleCreateStudent = async (values: studentSchemaType) => {
		try {
			await createStudent({
				fullName: values.fullName,
				phone: values.phone,
				email: values.email,
				password: values.password,
				classroomsId: values.classrooms.map(c => c.id),
			});

			setOpen(false);
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 403:
					setError("Доступ запрещен");
					break;
				case 409:
					setError("Уже существует ученик с таким email");
					break;
				case 400:
					setError("Превышено количество студентов");
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
					<span className="text-lg">Создать ученика</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Создать аккаунт ученика
					</DialogTitle>
					<DialogDescription>
						Создайте аккаунт ученика и добавьте его в класс, что бы он имел доступ к Вашим урокам в определенных классах
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleCreateStudent)} className="space-y-3">
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
						<FormField control={form.control}
								   name="classrooms"
								   defaultValue={[]}
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Классы</FormLabel>
										   <FormControl>
											   <MultiSelect itemsList={items}
															defaultSelectedItemsList={field.value}
															onChange={field.onChange}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				{error &&
                    <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                        <h3 className="text-lg">Ошибка создания аккаунта ученика</h3>
                        <p>{error}</p>
                    </div>
				}
				<DialogFooter>
					<Button onClick={form.handleSubmit(handleCreateStudent)} className="w-full mt-4">
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

export default CreateStudentDialogBtn;