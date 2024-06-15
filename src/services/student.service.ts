import apiClient from "../api.ts";
import {ICreateStudentReq, IStudentResp} from "../types/student.ts";

class studentService {
	async getStudents() {
		return await apiClient.get<IStudentResp[]>(`/students`);
	}

	async createStudent(req: ICreateStudentReq) {
		return await apiClient.post<IStudentResp>("/students", req);
	}

	async deleteStudent(studentId: string | number) {
		return await apiClient.delete(`/students/${studentId}`);
	}
}

export default new studentService();