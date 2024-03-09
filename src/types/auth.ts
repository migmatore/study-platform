export interface IAuthResp {
	token: string;
	wsToken: string;
	refreshToken: string;
	role: string;
}

export interface ISigninReq {
	email: string;
	password: string;
}

export interface ISignupReq {
	email: string;
	password: string;
	fullName: string;
	institutionName?: string | null;
	role: string;
}