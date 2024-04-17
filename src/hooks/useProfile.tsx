import {useContext} from "react";
import {ProfileContext} from "../provider/ProfileProvider.tsx";

const useProfile = () => {
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error("useProfile must be used within a ProfileContext");
	}

	return context;
}

export default useProfile;