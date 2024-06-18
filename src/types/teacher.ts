export interface ITeacherResp {
	id: number;
	fullName: string;
	phone?: string | null;
	email: string;
}

export interface ICreateTeacherReq {
	fullName: string;
	phone?: string | null;
	email: string;
	password: string;
}