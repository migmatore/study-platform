import {createContext, PropsWithChildren, useEffect, useMemo, useRef, useState} from "react";
import {IClassroomResp, ICreateClassroomReq} from "../types/classroom.ts";
import {AxiosError} from "axios";
import classroomService from "../services/classroom.service.ts";

type ClassroomsContextType = {
	classrooms: IClassroomResp[];
	createClassroom: (req: ICreateClassroomReq) => Promise<void>;
}

export const ClassroomsContext = createContext<ClassroomsContextType | null>(null);

const ClassroomsProvider = ({children}: PropsWithChildren) => {
	const [classrooms, setClassrooms] = useState<IClassroomResp[]>([]);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getClassrooms = async () => {
			try {
				const resp = await classroomService.getClassrooms();

				if (resp.status === 200) {
					setClassrooms(resp.data);
				}
			} catch (e) {
				const error = e as AxiosError;
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

	const contextValue = useMemo(() => ({
		classrooms,
		createClassroom,
	}), [classrooms]);

	return <ClassroomsContext.Provider value={contextValue}>
		{children}
	</ClassroomsContext.Provider>;
};

export default ClassroomsProvider;