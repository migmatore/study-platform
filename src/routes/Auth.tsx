import {Roles} from "../types/roles.ts";
import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth.tsx";

interface IAuthProps {
	allowedRoles: Roles[];
}

const Auth = ({allowedRoles}: IAuthProps) => {
	const {role} = useAuth();

	return allowedRoles.find((r) => role.includes(r)) ? (
		<Outlet/>
	) : (
			   <Navigate to="/" replace/>
		   );
};

export default Auth;