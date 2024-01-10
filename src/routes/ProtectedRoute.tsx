import {useAuth} from "../provider/AuthProvider.tsx";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = () => {
	const {token} = useAuth()

	if (!token) {
		return <Navigate to="/login"/>;
	}

	return <Outlet/>
}