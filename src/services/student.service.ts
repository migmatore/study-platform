import {ICreateLessonReq, ILessonsResp, IUpdateLesson} from "../types/lesson.ts";
import apiClient from "../api.ts";
import {IStudentResp} from "../types/student.ts";

class studentService {
	async getStudents() {
		return await apiClient.get<IStudentResp[]>(`/students`)
	}
}

export default new studentService();