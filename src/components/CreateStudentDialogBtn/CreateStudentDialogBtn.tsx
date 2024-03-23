import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
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

const phoneRegexp = new RegExp(/^((8|\+7)[\-_]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

const studentSchema = z.object({
	fullName: z.string().min(1).max(100),
	phone: z.string().regex(phoneRegexp).optional(),
	email: z.string().email().max(50),
	password: z.string().min(8).max(100),
});

type studentSchemaType = z.infer<typeof studentSchema>;

const CreateStudentDialogBtn = () => {
	const form = useForm<studentSchemaType>({
		resolver: zodResolver(studentSchema),
		mode: "onSubmit",
		defaultValues: {},
	});

	const createStudent = (values: studentSchemaType) => {
		console.log(values)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full py-5 h-[78px] gap-2 border-2 border-dashed">
					<Plus className="w-8 h-8"/>
					<span className="text-lg">Создать ученика</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Создать ученика
					</DialogTitle>
					<DialogDescription>
						Создайте аккаунт ученика и добавьте его в класс, что бы он имел доступ к Вашим урокам
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(createStudent)} className="space-y-3">
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
										   <FormLabel>Email</FormLabel>
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
											   <Input  type="password"{...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button onClick={form.handleSubmit(createStudent)} className="w-full mt-4">
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