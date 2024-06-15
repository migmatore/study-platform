import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogIn} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {Roles} from "../../types/roles.ts";
import lessonService from "../../services/lesson.service.ts";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/AlertDialog/AlertDialog.tsx";
import {AxiosError} from "axios";
import DeleteConfirmDialogBtn from "../DeleteConfirmDialogBtn/DeleteConfirmDialogBtn.tsx";
import useClassrooms from "../../hooks/useClassrooms.tsx";

interface Props {
	id: number;
	title: string;
	description: string;
}

const ClassroomItem = ({id, title, description}: Props) => {
	const navigate = useNavigate();
	const {deleteClassroom} = useClassrooms();
	const {role} = useAuth();
	const [currentLessonError, setCurrentLessonError] = useState<boolean>(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const handleGoToClassroom = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		if (role === Roles.Teacher || role === Roles.Admin) {
			navigate(`${id}/lessons`);
		} else {
			try {
				const resp = await lessonService.getCurrentLesson(id);

				if (resp.status === 200) {
					navigate(`${id}/lessons/${resp.data.id}`);
				}
			} catch (err) {
				const error = err as AxiosError;

				if (error.response?.status === 204 || error.response?.status === 403) {
					setCurrentLessonError(true);
				}
			}
		}
	};

	const handleDeleteClassroom = async () => {
		try {
			await deleteClassroom(id);
		} catch (e) {
			const error = e as AxiosError;

			switch (error.response?.status) {
				case 400:
					setDeleteError("Неверные данные");
					break;
				case 401:
					setDeleteError("Доступ запрещен или такого класса не существует");
					break;
				case 500:
					setDeleteError("Внутренняя ошибка сервера");
					break;
			}
		}
	};

	return (
		<div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between border p-5 rounded-lg">
			<div className="flex justify-center flex-col">
				<h2 className="text-2xl text-foreground">{title}</h2>
				{description && <p className="mt-2.5 text-foreground">{description}</p>}
			</div>
			<div className="flex justify-between sm:justify-center sm:items-center gap-3">
				<Button onClick={handleGoToClassroom} className="gap-2">
					<LogIn size={20}/>
					<p>Перейти</p>
				</Button>

				{role === Roles.Teacher ?
				 <DeleteConfirmDialogBtn title="Удаление класса"
										 description={`Вы точно хотите удалить класс ${title}?`}
										 error={deleteError}
										 onCancel={() => setDeleteError(null)}
										 onDelete={handleDeleteClassroom}
				 /> : null}
			</div>
			<AlertDialog open={currentLessonError} onOpenChange={setCurrentLessonError}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Ошибка
						</AlertDialogTitle>
					</AlertDialogHeader>
					<div><p>К сожалению в этом классе нет активных уроков :(</p></div>
					<AlertDialogFooter>
						<AlertDialogCancel>Понятно</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default ClassroomItem;