import React, {useState} from "react";
import styles from "./Pages.module.css";
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

const roles = z.enum(["admin", "teacher"])

const adminSchema = z.object({
	role: z.literal(roles.enum.admin),
	institutionName: z.string().min(5).max(200),
	fullName: z.string({required_error: "Это поле обязательно"})
		.min(5, "Количество символов в ФИО должно быть минимум 5")
		.max(
			100,
			"Количество символов в ФИО не должно превышать 100",
		),
	email: z.string().email("Неверный формат email").max(
		50,
		"Количество символов в email не должно превышать 50",
	),
	password: z.string().min(8, "Количество символов в пароле должно быть минимум 8").max(
		100,
		"Количество символов в пароле не должно превышать 100",
	),
})

const teacherSchema = z.object({
	role: z.literal(roles.enum.teacher),
	institutionName: z.string().max(200).optional(),
	fullName: z.string({required_error: "Это поле обязательно"})
		.min(5, "Количество символов в ФИО должно быть минимум 5")
		.max(
		100,
		"Количество символов в ФИО не должно превышать 100",
	),
	email: z.string().email("Неверный формат email").max(
		50,
		"Количество символов в email не должно превышать 50",
	),
	password: z.string().min(8, "Количество символов в пароле должно быть минимум 8").max(
		100,
		"Количество символов в пароле не должно превышать 100",
	),
})

const signupSchema = z.object({
	role: z.string(),
	institutionName: z.string().min(5).max(200).optional().or(z.literal("")),
	// fullName: z.string({required_error: "Это поле обязательно"})
	// 	//.min(5, "Количество символов в ФИО должно быть минимум 5")
	// 	.max(
	// 	100,
	// 	"Количество символов в ФИО не должно превышать 100",
	// ),
	// email: z.string().email("Неверный формат email").max(
	// 	50,
	// 	"Количество символов в email не должно превышать 50",
	// ),
	// password: z.string().min(8, "Количество символов в пароле должно быть минимум 8").max(
	// 	100,
	// 	"Количество символов в пароле не должно превышать 100",
	// ),
}).refine(input => {

	// allows bar to be optional only when foo is 'foo'
	return !(input.role !== "teacher" && input.institutionName === undefined);
});

const schema = z.discriminatedUnion("role", [adminSchema, teacherSchema])

type signupSchemaType = z.infer<typeof signupSchema>;
type schemaType = z.infer<typeof schema>;

const Signup = () => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		fullName: "",
		institutionName: "",
		role: "",
	});


	const form = useForm<schemaType>({
		resolver: zodResolver(schema),
		mode: "onBlur",
	});

	// try {
	// 	const p = schema.parse({
	// 		role: "teacher",
	// 		//institutionName: "123123123",
	// 		fullName: "123123",
	// 		password: "123123123123",
	// 		email: "test@gmail.com",
	// 	})
	//
	// 	console.log(p)
	// } catch (e) {
	// 	console.log(e)
	// }

	const isAdmin = form.watch("role", "teacher") === "admin";

	const handleSignup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		try {
			const resp = await authService.signup(credentials);
			const {token, refreshToken, role} = resp.data;

			console.log(resp.data);

			localStorage.setItem("token", token);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("role", role);
		} catch (error) {
			console.log(error);
		}
	};

	const t = (values: schemaType) => {
		console.log(values);
	};

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="p-6 py-3 border rounded-lg space-y-4">
				<div className="p-6 space-y-4">
					<div className="flex items-center justify-center">
						<p className="font-medium text-2xl">Регистрация</p>
					</div>
					<form className="space-y-7">
						<div className="space-y-4">
							{/*<label className="block">*/}
							{/*	Выберите роль*/}
							{/*</label>*/}
							{/*<select id="countries"*/}
							{/*		className={styles.select}*/}
							{/*		onChange={OnSelect}*/}
							{/*		defaultValue={credentials.role || "teacher"}>*/}
							{/*	<option value="teacher">Учитель</option>*/}
							{/*	<option value="admin">Администратор учебного заведения</option>*/}
							{/*</select>*/}
							{/*{admin ? (*/}
							{/*	<div className="space-y-4">*/}
							{/*		<label className="block">Название учебного заведения</label>*/}
							{/*		<input type="text" name="institutionName" placeholder="Название"*/}
							{/*			   className={styles.input} value={credentials.institutionName}*/}
							{/*			   onChange={handleChange}/>*/}
							{/*		<label className="block">ФИО</label>*/}
							{/*		<input type="text"*/}
							{/*			   name="fullName"*/}
							{/*			   placeholder="ФИО"*/}
							{/*			   className={styles.input}*/}
							{/*			   value={credentials.fullName}*/}
							{/*			   onChange={handleChange}/>*/}
							{/*		<label className="block">Email</label>*/}
							{/*		<input type="text"*/}
							{/*			   name="email"*/}
							{/*			   placeholder="Email"*/}
							{/*			   className={styles.input}*/}
							{/*			   value={credentials.email}*/}
							{/*			   onChange={handleChange}/>*/}
							{/*		<label className="block">Пароль</label>*/}
							{/*		<input type="text"*/}
							{/*			   name="password"*/}
							{/*			   placeholder="Пароль"*/}
							{/*			   className={styles.input}*/}
							{/*			   value={credentials.password}*/}
							{/*			   onChange={handleChange}/>*/}
							{/*	</div>*/}
							{/*) : (*/}
							{/*	 <div className="space-y-4">*/}
							{/*		 <label className="block">ФИО</label>*/}
							{/*		 <input type="text"*/}
							{/*				name="fullName"*/}
							{/*				placeholder="ФИО"*/}
							{/*				className={styles.input}*/}
							{/*				value={credentials.fullName}*/}
							{/*				onChange={handleChange}/>*/}
							{/*		 <label className="block">Email</label>*/}
							{/*		 <input type="text"*/}
							{/*				name="email"*/}
							{/*				placeholder="Email"*/}
							{/*				className={styles.input}*/}
							{/*				value={credentials.email}*/}
							{/*				onChange={handleChange}/>*/}
							{/*		 <label className="block">Пароль</label>*/}
							{/*		 <input type="text"*/}
							{/*				name="password"*/}
							{/*				placeholder="Пароль"*/}
							{/*				className={styles.input}*/}
							{/*				value={credentials.password}*/}
							{/*				onChange={handleChange}/>*/}
							{/*	 </div>*/}
							{/* )}*/}
						</div>
						<div className="space-y-4 flex flex-col px-7">
							<button className={styles.btn} onClick={handleSignup}>
								Зарегистрироваться
							</button>
						</div>
					</form>
					<Form {...form}>
						<form onBlur={form.handleSubmit(t)} className="space-y-3">
							<FormField control={form.control}
									   name="role"
									   //defaultValue="teacher"
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
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Signup;