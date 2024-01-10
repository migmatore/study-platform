import {authApiClient} from "../api.ts";
import {IAuthResp, ISigninReq, ISignupReq} from "../types/auth.ts";
class AuthService {
	async signin(req: ISigninReq) {
		return await authApiClient.post<IAuthResp>("/auth/signin", req)
	}

	async signup(req: ISignupReq) {
		return await authApiClient.post<IAuthResp>("/auth/signup", req)
	}
}

export default new AuthService()