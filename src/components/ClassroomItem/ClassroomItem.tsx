import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogIn, Trash2} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import {Roles} from "../../types/roles.ts";
import lessonService from "../../services/lesson.service.ts";
import {
	AlertDialog, AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/AlertDialog/AlertDialog.tsx";
import {AxiosError} from "axios";

interface Props {
	id: number;
	title: string;
	description: string;
}

const ClassroomItem = ({id, title, description}: Props) => {
	const navigate = useNavigate();
	const {role} = useAuth();
	const [currentLessonError, setCurrentLessonError] = useState<boolean>(false);

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
					setCurrentLessonError(true)
				}
			}
		}
	};

	return (
		<div className="flex justify-between border p-5 rounded-lg">
			<div>
				<h2 className="text-xl text-foreground">{title}</h2>
				{description && <p className="mt-2.5 text-foreground">{description}</p>}
			</div>
			<div className="flex justify-center items-center gap-3">
				<Button onClick={handleGoToClassroom}>
					<div className="flex gap-2">
						<LogIn size={20}/>
						<p>Перейти</p>
					</div>
				</Button>
				<Button variant="danger_outline">
					<Trash2 size={20}/>
				</Button>
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