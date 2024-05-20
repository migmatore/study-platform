export interface IUpdateProfileReq {
	full_name?: string | null;
	phone?: string | null;
	email?: string | null;
	password?: string | null;
}

export interface IProfileResp {
	fullName: string;
	phone: string;
	email: string;
}