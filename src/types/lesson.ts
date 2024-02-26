import {LessonElementInstance} from "../components/LessonElements/LessonElements.tsx";

export interface ILessonsResp {
	id: number;
	title: string;
	classroomId: number;
	content?: LessonElementInstance[] | null;
	active: boolean;
}

export interface ICreateLessonReq {
	title: string;
	active: boolean;
}

export interface IUpdateLesson {
	lessonId: number;
	title?: string | null;
	classroomId?: number | null;
	content?: LessonElementInstance[] | null;
	active?: boolean | null;
}

export type LessonType = {
	id: number;
	title: string;
	classroomId: number;
	content?: LessonElementInstance[] | null;
	active: boolean;
}