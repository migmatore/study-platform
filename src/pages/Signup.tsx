import React, {useState} from "react";
import styles from "./Pages.module.css";
import authService from "../services/auth.service.ts";

const Signup = () => {
	const [admin, setAdmin] = useState(false);
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		fullName: "",
		institutionName: "",
		role: "",
	});

	const OnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCredentials(prev => ({...prev, role: e.target.value}));

		if (e.target.value == "admin") {
			setAdmin(true);
		} else {
			setAdmin(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

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

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="p-6 py-3 border rounded-lg space-y-4">
				<div className="p-6 space-y-4">
					<div className="flex items-center justify-center">
						<p className="font-medium text-xl">Регистрация</p>
					</div>
					<form className="space-y-7">
						<div className="space-y-4">
							<label className="block">
								Выберите роль
							</label>
							<select id="countries"
									className={styles.select}
									onChange={OnSelect}
									defaultValue={credentials.role || "teacher"}>
								<option value="teacher">Учитель</option>
								<option value="admin">Администратор учебного заведения</option>
							</select>
							{admin ? (
								<div className="space-y-4">
									<label className="block">Название учебного заведения</label>
									<input type="text" name="institutionName" placeholder="Название"
										   className={styles.input} value={credentials.institutionName}
										   onChange={handleChange}/>
									<label className="block">ФИО</label>
									<input type="text"
										   name="fullName"
										   placeholder="ФИО"
										   className={styles.input}
										   value={credentials.fullName}
										   onChange={handleChange}/>
									<label className="block">Email</label>
									<input type="text"
										   name="email"
										   placeholder="Email"
										   className={styles.input}
										   value={credentials.email}
										   onChange={handleChange}/>
									<label className="block">Пароль</label>
									<input type="text"
										   name="password"
										   placeholder="Пароль"
										   className={styles.input}
										   value={credentials.password}
										   onChange={handleChange}/>
								</div>
							) : (
								 <div className="space-y-4">
									 <label className="block">ФИО</label>
									 <input type="text"
											name="fullName"
											placeholder="ФИО"
											className={styles.input}
											value={credentials.fullName}
											onChange={handleChange}/>
									 <label className="block">Email</label>
									 <input type="text"
											name="email"
											placeholder="Email"
											className={styles.input}
											value={credentials.email}
											onChange={handleChange}/>
									 <label className="block">Пароль</label>
									 <input type="text"
											name="password"
											placeholder="Пароль"
											className={styles.input}
											value={credentials.password}
											onChange={handleChange}/>
								 </div>
							 )}
						</div>
						<div className="space-y-4 flex flex-col px-7">
							<button className={styles.btn} onClick={handleSignup}>
								Зарегистрироваться
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;