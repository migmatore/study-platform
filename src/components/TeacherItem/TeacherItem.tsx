import DeleteConfirmDialogBtn from "../DeleteConfirmDialogBtn/DeleteConfirmDialogBtn.tsx";
import {useState} from "react";
import {AxiosError} from "axios";
import useTeachers from "../../hooks/useTeachers.tsx";

interface Props {
	id: number;
	fullName: string;
	email: string;
}

const TeacherItem = ({id, fullName, email}: Props) => {
	const {deleteTeacher} = useTeachers();
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const handleDeleteTeacher = async () => {
		try {
			await deleteTeacher(id);
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 400:
					setDeleteError("Неверные данные");
					break;
				case 401:
					setDeleteError("Доступ запрещен или такого преподавателя не существует");
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
				 <DeleteConfirmDialogBtn title="Удаление аккаунта преподавателя"
										 description={`Вы точно хотите удалить аккаунт преподавателя ${fullName}?`}
										 error={deleteError}
										 onCancel={() => setDeleteError(null)}
										 onDelete={handleDeleteTeacher}/>
			</div>
		</div>
	)
}

export default TeacherItem;