import {useContext} from "react";
import {LessonsContext} from "../provider/LessonsProvider.tsx";

const useLessons = () => {
	const context = useContext(LessonsContext);

	if (!context) {
		throw new Error("useLessons must be used within a LessonsContext");
	}

	return context;
}

export default useLessons;