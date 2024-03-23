import useAuth from "../hooks/useAuth.tsx";
import {Roles} from "../types/roles.ts";
import CreateStudentDialogBtn from "../components/CreateStudentDialogBtn/CreateStudentDialogBtn.tsx";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import StudentItem from "../components/StudentItem/StudentItem.tsx";
import studentService from "../services/student.service.ts";
import {IStudentResp} from "../types/student.ts";

const Students = () => {
	const {role} = useAuth();

	const [students, setStudents] = useState<IStudentResp[]>();

	useEffect(() => {
		const getStudents = async () => {
			try {
				const resp = await studentService.getStudents();
				console.log(resp);

				setStudents(resp.data);
			} catch (e) {
				const error = e as AxiosError;
				console.log(error);
			}
		};

		getStudents().catch(console.error);
	}, []);

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<h1 className="text-2xl text-foreground">Список учеников</h1>
				<p className="text-muted-foreground">Количество: </p>
			</div>
			<div className="flex flex-col space-y-4">
				{role === Roles.Teacher ? <CreateStudentDialogBtn/> : null}
				{students !== undefined
				 ? students.map(student =>
						<StudentItem key={student.id}
									 id={student.id}
									 fullName={student.fullName}
									 email={student.email}
									 classroomsId={student.classroomsId}/>)
				 : null}
			</div>
		</div>
	);
};

export default Students;