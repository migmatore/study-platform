import {useContext} from "react";
import {TeacherContext} from "../provider/TeacherProvider.tsx";

const useTeachers = () => {
	const context = useContext(TeacherContext);

	if (!context) {
		throw new Error("useTeachers must be used within a TeachersContext");
	}

	return context;
}

export default useTeachers;