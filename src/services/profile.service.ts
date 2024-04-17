import apiClient from "../api.ts";
import {IProfileResp} from "../types/profile.ts";

class ProfileService {
	async getProfile() {
		return await apiClient.get<IProfileResp>("/users/profile");
	}
}

export default new ProfileService();