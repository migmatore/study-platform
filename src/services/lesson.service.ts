import apiClient from "../api.ts";
import {ICreateLessonReq, ILessonsResp, IUpdateLesson} from "../types/lesson.ts";

class LessonService {
	async createLesson(classroomId: string, req: ICreateLessonReq) {
		return await apiClient.post<ILessonsResp>(`/classrooms/${classroomId}/lessons`, req)
	}

	async updateLesson(classroomId: string, req: IUpdateLesson) {
		return await apiClient.put(`/classrooms/${classroomId}/lessons`, req)
	}

	async getCurrentLesson(classroomId: string | number) {
		return await apiClient.get<ILessonsResp>(`/classrooms/${classroomId}/lessons/current`)
	}
}

export default new LessonService();