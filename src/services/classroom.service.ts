import apiClient from "../api.ts";
import {IClassroomResp} from "../types/classroom.ts";

class ClassroomService {
	async getClassrooms() {
		return await apiClient.get<IClassroomResp>("/classrooms");
	}
}

export default new ClassroomService();