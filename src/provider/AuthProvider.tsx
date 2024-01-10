import {createContext, PropsWithChildren, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {enumFromValue, Roles} from "../types/roles.ts";

interface IAuthContext {
	token: string | null;
	setToken?: (newToken: SetStateAction<string | null>) => void;
	role: Roles;
	setRole?: (role: SetStateAction<Roles>) => void;
}

const defaultState: IAuthContext = {
	token: null,
	role: Roles.Student,
}

const AuthContext = createContext<IAuthContext>(defaultState);

const AuthProvider = ({children}: PropsWithChildren) => {
	const [token, setToken_] = useState(localStorage.getItem('token'));
	const [role, setRole_] = useState<Roles>(
		enumFromValue(localStorage.getItem('role') || "student", Roles)
	);

	const setToken = (newToken: SetStateAction<string | null>) => {
		setToken_(newToken);
	};

	const setRole = (role: SetStateAction<Roles>) => {
		setRole_(role)
	}

	useEffect(() => {
		if (token && role) {
			localStorage.setItem('token', token);
			localStorage.setItem('role', role.toString())
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('role')
		}
	}, [token, role])

	const contextValue = useMemo(
		() => ({
			token, setToken,
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