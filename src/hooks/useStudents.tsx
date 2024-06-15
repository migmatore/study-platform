import {useContext} from "react";
import {StudentsContext} from "../provider/StudentsProvider.tsx";

const useStudents = () => {
	const context = useContext(StudentsContext);

	if (!context) {
		throw new Error("useStudents must be used within a StudentsContext");
	}

	return context;
}

export default useStudents;