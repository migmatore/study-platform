export interface IStudentResp {
	id: number;
	fullName: string;
	phone?: string | null;
	email: string;
	classroomsId: Array<number>;
}