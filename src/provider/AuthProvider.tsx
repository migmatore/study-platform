import {createContext, PropsWithChildren, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {enumFromValue, Roles} from "../types/roles.ts";

interface IAuthContext {
	token: string | null;
	setToken?: (newToken: SetStateAction<string | null>) => void;
	refreshToken: string | null;
	setRefreshToken?: (newToken: SetStateAction<string | null>) => void;
	role: Roles;
	setRole?: (role: SetStateAction<Roles>) => void;
}

const defaultState: IAuthContext = {
	token: null,
	refreshToken: null,
	role: Roles.Student,
}

const AuthContext = createContext<IAuthContext>(defaultState);

const AuthProvider = ({children}: PropsWithChildren) => {
	const [token, setToken_] = useState(localStorage.getItem('token'));
	const [
		refreshToken,
		setRefreshToken_
	] = useState(localStorage.getItem('refreshToken'))
	const [role, setRole_] = useState<Roles>(
		enumFromValue(localStorage.getItem('role') || "student", Roles)
	);

	const setToken = (newToken: SetStateAction<string | null>) => {
		setToken_(newToken);
	};

	const setRefreshToken = (newToken: SetStateAction<string | null>) => {
		setRefreshToken_(newToken)
	}

	const setRole = (role: SetStateAction<Roles>) => {
		setRole_(role)
	}

	useEffect(() => {
		if (token && refreshToken && role) {
			localStorage.setItem('token', token);
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('role', role.toString())
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('role')
		}
	}, [token, role])

	const contextValue = useMemo(
		() => ({
			token, setToken,
			refreshToken, setRefreshToken,
			role, setRole,
		}),
		[token, role]
	);

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext);
}

export default AuthProvider;