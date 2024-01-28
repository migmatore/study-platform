import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import styles from "./Pages.module.css"
import authService from "../services/auth.service.ts";
import {useAuth} from "../provider/AuthProvider.tsx";
import {enumFromValue, Roles} from "../types/roles.ts";

const Login = () => {
	const {
		setToken,
		setRole,
		setRefreshToken
	} = useAuth()
	const navigate = useNavigate()
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		})
	}

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		try {
			const resp = await authService.signin({
				email: credentials.email,
				password: credentials.password
			})

			const {token, refreshToken, role} = resp.data

			console.log(resp.data)

			if (setToken) {
				setToken(token)
			}

			if (setRole) {
				setRole(enumFromValue(role, Roles))
			}

			if (setRefreshToken) {
				setRefreshToken(refreshToken)
			}

			//localStorage.setItem('refreshToken', refreshToken)

			navigate("/", {replace: true})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSignup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		navigate("/signup")
	}

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="p-6 py-3 border rounded-lg space-y-4">
				<div className="p-6 space-y-4">
					<form className="space-y-7">
						<div className="space-y-4">
							<label className="block">Email</label>
							<input type="text" name="email" placeholder="Email" value={credentials.email}
								   onChange={handleChange} className={styles.input}/>
							<label className="block">Пароль</label>
							<input type="text" name="password" placeholder="Пароль" value={credentials.password}
								   onChange={handleChange} className={styles.input}/>
						</div>
						<div className="space-y-4 flex flex-col px-7">
							<button className={styles.btn} onClick={handleLogin}>
								Войти
							</button>
							<button onClick={handleSignup}
									className={styles.btn}>
								Зарегистрироваться
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login