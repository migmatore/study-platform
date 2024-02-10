import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useAuth from "../hooks/useAuth.tsx";

const Logout = () => {
	const {setToken} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (setToken) {
			setToken(null);
		}
		navigate("/", {replace: true});
	})

	return <></>;
}

export default Logout;