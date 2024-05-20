import authService from "../services/auth.service.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../components/ui/Form/Form.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/Select/Select.tsx";
import {Input} from "../components/ui/Input/Input.tsx";
import {Button} from "../components/ui/Button/Button.tsx";
import {ImSpinner2} from "react-icons/im";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {AxiosError} from "axios";
import {enumFromValue, Roles} from "../types/roles.ts";
import useAuth from "../hooks/useAuth.tsx";

const roles = z.enum(["admin", "teacher"]);

const adminSchema = z.object({
	role: z.literal(roles.enum.admin),
	institutionName: z.string({required_error: "Это поле обязательно"})
		.min(5, "Количество символов в названии должно быть минимум 5")
		.max(200, "Количество символов в названии не должно превышать 200"),
	fullName: z.string({required_error: "Это поле обязательно"})
		.min(5, "Количество символов в ФИО должно быть минимум 5")
		.max(100, "Количество символов в ФИО не должно превышать 100"),
	email: z.string({required_error: "Это поле обязательно"})
		.email("Неверный формат email")
		.max(50, "Количество символов в email не должно превышать 50"),
	password: z.string({required_error: "Это поле обязательно"})
		.min(8, "Количество символов в пароле должно быть минимум 8")
		.max(100, "Количество символов в пароле не должно превышать 100"),
});

const teacherSchema = z.object({
	role: z.literal(roles.enum.teacher),
	fullName: z.string({required_error: "Это поле обязательно"})
		.min(5, "Количество символов в ФИО должно быть минимум 5")
		.max(100, "Количество символов в ФИО не должно превышать 100"),
	email: z.string({required_error: "Это поле обязательно"})
		.email("Неверный формат email")
		.max(50, "Количество символов в email не должно превышать 50"),
	password: z.string({required_error: "Это поле обязательно"})
		.min(8, "Количество символов в пароле должно быть минимум 8")
		.max(100, "Количество символов в пароле не должно превышать 100"),
});

const signupSchema = z.discriminatedUnion("role", [adminSchema, teacherSchema]);

type signupSchemaType = z.infer<typeof signupSchema>;

const Signup = () => {
	const navigate = useNavigate();
	const {
		setToken,
		setWsToken,
		setRole,
		setRefreshToken,
	} = useAuth();
	const [error, setError] = useState<string | null>(null);
	const form = useForm<signupSchemaType>({
		resolver: zodResolver(signupSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {
			role: roles.enum.teacher,
			fullName: "",
			email: "",
			password: "",
		},
	});

	const isAdmin = form.watch("role", "teacher") === "admin";

	const handleSignup = async (values: signupSchemaType) => {
		try {
			const resp = await authService.signup({...values});
			const {token, refreshToken, wsToken, role} = resp.data;

			if (resp.status === 201) {
				if (setToken) {
					setToken(token);
				}

				if (setWsToken) {
					setWsToken(wsToken);
				}

				if (setRole) {
					setRole(enumFromValue(role, Roles));
				}

				if (setRefreshToken) {
					setRefreshToken(refreshToken);
				}

				navigate("/profile", {replace: true});
			}
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 400:
					setError("Данные введены неверно");
					break;
				case 409:
					setError("Пользователь с такими данными уже существует");
					break;
				case 500:
					setError("Внутренняя ошибка сервера");
					break;
			}

			console.log(error);
		}
	};

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="p-6 py-3 border rounded-lg space-y-4">
				<div className="p-6 space-y-4">
					<div className="flex items-center justify-center">
						<p className="font-medium text-2xl">Регистрация</p>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSignup)} className="space-y-3">
							<FormField control={form.control}
									   name="role"
								// defaultValue="teacher"
									   render={({field}) => (
										   <FormItem>
											   <FormLabel>Роль</FormLabel>
											   <FormControl>
												   <Select value={field.value} onValueChange={field.onChange}>
													   <SelectTrigger>
														   <SelectValue/>
													   </SelectTrigger>
													   <SelectContent>
														   <SelectGroup>
															   <SelectItem value={roles.enum.teacher.toString()}>Учитель</SelectItem>
															   <SelectItem value={roles.enum.admin.toString()}>
																   Администратор учебного заведения
															   </SelectItem>
														   </SelectGroup>
													   </SelectContent>
												   </Select>
											   </FormControl>
											   <FormMessage/>
										   </FormItem>
									   )}
							/>
							{isAdmin ? (
								<FormField control={form.control}
										   name="institutionName"
										   defaultValue=""
										   render={({field}) => (
											   <FormItem>
												   <FormLabel>Название учебного заведения</FormLabel>
												   <FormControl>
													   <Input {...field}/>
												   </FormControl>
												   <FormMessage/>
											   </FormItem>
										   )}
								/>
							) : null}
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
												   <Input type="password" {...field}/>
											   </FormControl>
											   <FormMessage/>
										   </FormItem>
									   )}
							/>
						</form>
						{error &&
                            <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                                <h3 className="text-lg">Ошибка регистрации</h3>
                                <p>{error}</p>
                            </div>
						}
						<div className="pt-4 px-5 space-y-3">
							<Button onClick={form.handleSubmit(handleSignup)} className="w-full">
								{!form.formState.isSubmitting && <span>Зарегистрироваться</span>}
								{form.formState.isSubmitting && (
									<ImSpinner2 className="animate-spin"/>
								)}
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Signup;