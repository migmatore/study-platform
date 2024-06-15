import {createContext, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";
import {AxiosError} from "axios";
import {ICreateStudentReq, IStudentResp} from "../types/student.ts";
import studentService from "../services/student.service.ts";

type StudentsContextType = {
	students: IStudentResp[];
	fetchError: string | null;
	isLoading: boolean;
	createStudent: (req: ICreateStudentReq) => Promise<void>;
	deleteStudent: (studentId: number) => Promise<void>;
	getStudents: () => IStudentResp[];
}

export const StudentsContext = createContext<StudentsContextType | null>(null);

const StudentsProvider = ({children}: PropsWithChildren) => {
	const [students, setStudents] = useState<IStudentResp[]>([]);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getStudents = async () => {
			try {
				const resp = await studentService.getStudents();

				if (resp.status === 200) {
					setIsLoading(false);
					setStudents(resp.data);
				}
			} catch (e) {
				const error = e as AxiosError;
				setIsLoading(false);
				setFetchError("Ошибка получения студентов");
				console.log(error);
			}
		};

		getStudents().catch(console.error);
	}, []);

	const createStudent = async (req: ICreateStudentReq) => {
		const resp = await studentService.createStudent(req);

		if (resp.status === 201) {
			setStudents(prev => [
				...prev,
				{
					id: resp.data.id,
					fullName: resp.data.fullName,
					phone: resp.data.phone,
					email: resp.data.email,
					classroomsId: resp.data.classroomsId,
				},
			]);
		}
	};

	const deleteStudent = async (studentId: number) => {
		const resp = await studentService.deleteStudent(studentId);

		if (resp.status === 200) {
			setStudents(prev => prev.filter((c) => c.id !== studentId));
		}
	};

	const getStudents = () => {
		return students;
	}

	const contextValue: StudentsContextType | null = useMemo(() => ({
		students,
		fetchError,
		isLoading,
		createStudent,
		getStudents,
		deleteStudent,
	}), [students, fetchError, isLoading]);

	return <StudentsContext.Provider value={contextValue}>
		{children}
	</StudentsContext.Provider>;
};

export default StudentsProvider ;