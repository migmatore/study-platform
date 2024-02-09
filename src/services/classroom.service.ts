import apiClient from "../api.ts";
import {IClassroomResp} from "../types/classroom.ts";
import {ILessonsResp} from "../types/lesson.ts";

class ClassroomService {
	async getClassrooms() {
		return await apiClient.get<IClassroomResp[]>("/classrooms");
	}

	async getLessons(classroomId: string) {
		return await apiClient.get<ILessonsResp[]> (`/classrooms/${classroomId}/lessons`)
	}
}

export default new ClassroomService();