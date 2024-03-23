export interface IClassroomResp {
	id: number;
	title: string;
	description: string;
	teacherId: number;
	maxStudents: number;
}

export interface ICreateClassroomReq {
	title: string;
	description?: string | null;
	maxStudents: number;
}