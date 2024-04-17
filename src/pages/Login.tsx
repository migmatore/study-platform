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

			navigate("/", {replace: true});
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 401:
					setError("Неверный логин или пароль");
					break;
				case 500:
					setError("Внутренняя ошибка сервера");
					break;
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
							{error &&
                                <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                                    <h3 className="text-lg">Ошибка входа</h3>
                                    <p>{error}</p>
                                </div>
							}
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