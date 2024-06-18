import apiClient from "../api.ts";
import {ICreateTeacherReq, ITeacherResp} from "../types/teacher.ts";

class teacherService {
	async getTeachers() {
		return await apiClient.get<ITeacherResp[]>(`/teachers`);
	}

	async deleteTeacher(teacherId: number) {
		return await apiClient.delete(`/teachers/${teacherId}`);
	}

	async createTeacher(teacher: ICreateTeacherReq) {
		return await apiClient.post<ITeacherResp>(`/teachers`, teacher)
	}
}

export default new teacherService();