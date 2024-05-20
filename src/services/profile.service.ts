import apiClient from "../api.ts";
import {IProfileResp, IUpdateProfileReq} from "../types/profile.ts";

class ProfileService {
	async getProfile() {
		return await apiClient.get<IProfileResp>("/users/profile");
	}

	async updateProfile(profile: IUpdateProfileReq) {
		return await apiClient.put<IProfileResp>("/users/profile", profile);
	}
}

export default new ProfileService();