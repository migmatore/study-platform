import {Roles} from "../../types/roles.ts";
import DeleteConfirmDialogBtn from "../DeleteConfirmDialogBtn/DeleteConfirmDialogBtn.tsx";
import {useState} from "react";
import useAuth from "../../hooks/useAuth.tsx";
import {AxiosError} from "axios";
import useStudents from "../../hooks/useStudents.tsx";

interface Props {
	id: number;
	fullName: string;
	email: string;
	classroomsId: Array<number>;
}

const StudentItem = ({id, fullName, email}: Props) => {
	const {deleteStudent} = useStudents();
	const {role} = useAuth();
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const handleDeleteStudent = async () => {
		try {
			await deleteStudent(id);
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 400:
					setDeleteError("Неверные данные");
					break;
				case 401:
					setDeleteError("Доступ запрещен или такого студента не существует");
					break;
				case 500:
					setDeleteError("Внутренняя ошибка сервера");
					break;
			}
		}
	}


	return (
		<div className="flex justify-between border p-5 rounded-lg">
			<div>
				<h2 className="text-xl text-foreground">{fullName}</h2>
				<p className="mt-2.5 text-foreground">{email}</p>
			</div>
			<div className="flex justify-center items-center">
				{role === Roles.Teacher ?
				 <DeleteConfirmDialogBtn title="Удаление аккаунта студента"
										 description={`Вы точно хотите удалить аккаунт студента ${fullName}?`}
										 error={deleteError}
										 onCancel={() => setDeleteError(null)}
										 onDelete={handleDeleteStudent}
				 /> : null}
			</div>
		</div>
	)
}

export default StudentItem;