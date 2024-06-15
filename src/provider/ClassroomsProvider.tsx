import {createContext, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";
import {IClassroomResp, ICreateClassroomReq} from "../types/classroom.ts";
import {AxiosError} from "axios";
import classroomService from "../services/classroom.service.ts";

type ClassroomsContextType = {
	classrooms: IClassroomResp[];
	fetchError: string | null;
	isLoading: boolean;
	createClassroom: (req: ICreateClassroomReq) => Promise<void>;
	deleteClassroom: (classroomId: number) => Promise<void>;
	getClassrooms: () => IClassroomResp[];
}

export const ClassroomsContext = createContext<ClassroomsContextType | null>(null);

const ClassroomsProvider = ({children}: PropsWithChildren) => {
	const [classrooms, setClassrooms] = useState<IClassroomResp[]>([]);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getClassrooms = async () => {
			try {
				const resp = await classroomService.getClassrooms();

				if (resp.status === 200) {
					setIsLoading(false);
					setClassrooms(resp.data);
				}
			} catch (e) {
				const error = e as AxiosError;
				setIsLoading(false);
				setFetchError("Ошибка получения классов");
				console.log(error);
			}
		};

		getClassrooms().catch(console.error);
	}, []);

	const createClassroom = async (req: ICreateClassroomReq) => {
		const resp = await classroomService.createClassroom(req);

		if (resp.status === 201) {
			setClassrooms(prev => [
				...prev,
				{
					id: resp.data.id,
					title: resp.data.title,
					description: resp.data.description,
					maxStudents: resp.data.maxStudents,
					teacherId: resp.data.teacherId,
				},
			]);
		}
	};

	const deleteClassroom = async (classroomId: number) => {
		const resp = await classroomService.deleteClassroom(classroomId);

		if (resp.status === 200) {
			setClassrooms(prev => prev.filter((c) => c.id !== classroomId));
		}
	};

	const getClassrooms = () => {
		return classrooms;
	}

	const contextValue: ClassroomsContextType | null = useMemo(() => ({
		classrooms,
		fetchError,
		isLoading,
		createClassroom,
		deleteClassroom,
		getClassrooms,
	}), [classrooms, fetchError, isLoading]);

	return <ClassroomsContext.Provider value={contextValue}>
		{children}
	</ClassroomsContext.Provider>;
};

export default ClassroomsProvider;