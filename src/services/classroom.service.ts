import apiClient from "../api.ts";
import {IClassroomResp, ICreateClassroomReq} from "../types/classroom.ts";
import {ILessonsResp} from "../types/lesson.ts";

class ClassroomService {
	async createClassroom(req: ICreateClassroomReq) {
		return await apiClient.post<IClassroomResp>("/classrooms", req);
	}

	async deleteClassroom(classroomId: string | number) {
		return await apiClient.delete(`/classrooms/${classroomId}`);
	}

	async getClassrooms() {
		return await apiClient.get<IClassroomResp[]>("/classrooms");
	}

	async getLessons(classroomId: number | string) {
		return await apiClient.get<ILessonsResp[]>(`/classrooms/${classroomId}/lessons`);
	}
}

export default new ClassroomService();