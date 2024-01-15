import {useAuth} from "../provider/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

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