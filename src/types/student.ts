export interface IStudentResp {
	id: number;
	fullName: string;
	phone?: string | null;
	email: string;
	classroomsId: Array<number>;
}

export interface ICreateStudentReq {
	fullName: string;
	phone?: string | null;
	email: string;
	password: string;
	classroomsId: Array<number>;
}