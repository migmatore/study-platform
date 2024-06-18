import {createContext, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";
import {AxiosError} from "axios";
import {ICreateTeacherReq, ITeacherResp} from "../types/teacher.ts";
import teacherService from "../services/teacher.service.ts";

type TeachersContextType = {
	teachers: ITeacherResp[];
	fetchError: string | null;
	isLoading: boolean;
	createTeacher: (req: ICreateTeacherReq) => Promise<void>;
	deleteTeacher: (teacherId: number) => Promise<void>;
	getTeachers: () => ITeacherResp[];
}

export const TeacherContext = createContext<TeachersContextType | null>(null);

const TeacherProvider = ({children}: PropsWithChildren) => {
	const [teachers, setTeachers] = useState<ITeacherResp[]>([]);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getTeachers = async () => {
			try {
				const resp = await teacherService.getTeachers();

				if (resp.status === 200) {
					setIsLoading(false);
					setTeachers(resp.data);
				}
			} catch (e) {
				const error = e as AxiosError;
				setIsLoading(false);
				setFetchError("Ошибка получения преподавателей");
				console.log(error);
			}
		};

		getTeachers().catch(console.error);
	}, []);

	const createTeacher = async (req: ICreateTeacherReq) => {
		const resp = await teacherService.createTeacher(req);

		if (resp.status === 201) {
			setTeachers(prev => [
				...prev,
				{
					id: resp.data.id,
					fullName: resp.data.fullName,
					phone: resp.data.phone,
					email: resp.data.email,
				},
			]);
		}
	};

	const deleteTeacher = async (teacherId: number) => {
		const resp = await teacherService.deleteTeacher(teacherId);

		if (resp.status === 200) {
			setTeachers(prev => prev.filter((c) => c.id !== teacherId));
		}
	};

	const getTeachers = () => {
		return teachers;
	};

	const contextValue: TeachersContextType | null = useMemo(() => ({
		teachers,
		fetchError,
		isLoading,
		createTeacher,
		getTeachers,
		deleteTeacher,
	}), [teachers, fetchError, isLoading]);

	return <TeacherContext.Provider value={contextValue}>
		{children}
	</TeacherContext.Provider>;
};

export default TeacherProvider;