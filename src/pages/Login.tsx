import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import authService from "../services/auth.service.ts";
import {enumFromValue, Roles} from "../types/roles.ts";
import useAuth from "../hooks/useAuth.tsx";
import {AxiosError} from "axios";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../components/ui/Form/Form.tsx";
import {Input} from "../components/ui/Input/Input.tsx";
import {Button} from "../components/ui/Button/Button.tsx";
import {ImSpinner2} from "react-icons/im";

const loginSchema = z.object({
	email: z.string().email("Неверный формат email").max(
		50,
		"Количество символов в email не должно превышать 50",
	),
	password: z.string().min(4, "Количество символов в пароле должно быть минимум 8").max(
		100,
		"Количество символов в пароле не должно превышать 100",
	),
});

type loginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
	const {
		setToken,
		setWsToken,
		setRole,
		setRefreshToken,
	} = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<loginSchemaType>({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
		defaultValues: {},
	});

	const handleLogin = async (values: loginSchemaType) => {
		try {
			const resp = await authService.signin({
				email: values.email,
				password: values.password,
			});

			const {token, wsToken, refreshToken, role} = resp.data;

			console.log(resp.data);

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

			//localStorage.setItem('refreshToken', refreshToken)

			navigate("/", {replace: true});
		} catch (e) {
			const error = e as AxiosError;

			if (error.response) {
				if (error.response.status === 401) {
					setError("Неверный логин или пароль");
				} else if (error.response.status === 500) {
					setError("Внутренняя ошибка сервера");
				}
			}

			console.log(error);
		}
	};

	const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		navigate("/signup");
	};

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="p-6 py-3 border rounded-lg space-y-4">
				<div className="p-6 space-y-4">
					<div className="flex items-center justify-center">
						<p className="font-medium text-2xl">Вход</p>
					</div>
					{/*<form className="space-y-7">*/}
					{/*	<div className="space-y-4">*/}
					{/*		<label className="block">Email</label>*/}
					{/*		<input type="text"*/}
					{/*			   name="email"*/}
					{/*			   placeholder="Email"*/}
					{/*			   value={credentials.email}*/}
					{/*			   onChange={handleChange}*/}
					{/*			   className={styles.input}/>*/}
					{/*		<label className="block">Пароль</label>*/}
					{/*		<input type="text"*/}
					{/*			   name="password"*/}
					{/*			   placeholder="Пароль"*/}
					{/*			   value={credentials.password}*/}
					{/*			   onChange={handleChange}*/}
					{/*			   className={styles.input}/>*/}
					{/*	</div>*/}
					{/*	{error &&*/}
                    {/*        <div className="flex bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">*/}
                    {/*            <p>{error}</p>*/}
                    {/*        </div>*/}
					{/*	}*/}
					{/*	<div className="space-y-4 flex flex-col px-7">*/}
					{/*		<button className={styles.btn} onClick={handleLogin}>*/}
					{/*			Войти*/}
					{/*		</button>*/}
					{/*		<button onClick={handleSignup}*/}
					{/*				className={styles.btn}>*/}
					{/*			Зарегистрироваться*/}
					{/*		</button>*/}
					{/*	</div>*/}
					{/*</form>*/}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-3">
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
							<div className="pt-4 px-5 space-y-3">
								<Button onClick={form.handleSubmit(handleLogin)} className="w-full">
									{!form.formState.isSubmitting && <span>Войти</span>}
									{form.formState.isSubmitting && (
										<ImSpinner2 className="animate-spin"/>
									)}
								</Button>
								<Button onClick={handleSignup} className="w-full">
									Зарегистрироваться
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Login;