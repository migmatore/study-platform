import {useContext} from "react";
import {ClassroomsContext} from "../provider/ClassroomsProvider.tsx";

const useClassrooms = () => {
	const context = useContext(ClassroomsContext);

	if (!context) {
		throw new Error("useClassrooms must be used within a ClassroomsContext");
	}

	return context;
}

export default useClassrooms;