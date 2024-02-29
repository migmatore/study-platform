import {cn} from "../../utils";
import {LogIn, Pencil, Pin, PinOff, Trash2} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../ui/Button/Button.tsx";
import useLessons from "../../hooks/useLessons.tsx";
import lessonService from "../../services/lesson.service.ts";

interface Props {
	id: number;
	classroomId: string;
	title: string;
	active: boolean;
}

const LessonItem = ({id, classroomId, title, active}: Props) => {
	const {setActiveLesson} = useLessons();
	const navigate = useNavigate();

	const handleGoToLesson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		navigate(`${id}`)
	}

	const handleTogglePin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		try {
			const resp = await lessonService.updateLesson(classroomId, {lessonId: id, active: !active});

			if (resp.status === 200) {
				setActiveLesson(id);
			}
		} catch (e) {
			console.error(e)
		}
	};

	const handleEditLesson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		navigate(`${id}/edit`);
	};

	return (
		<div className={cn(
			"flex flex-col flex-grow-0 shrink basis-[24%] border p-5 rounded-lg items-center gap-4",
			{"border-primary": active},
		)}>
			<div>
				<h2 className="text-lg break-words mb-auto text-center text-foreground">{title}</h2>
			</div>
			<div className="flex flex-col justify-center items-center mt-auto">
				<div className="grid grid-cols-1 gap-3">
					<Button className="gap-2" onClick={handleGoToLesson}>
						<LogIn size={20}/>
						<p>Перейти</p>
					</Button>
					<div className="grid grid-cols-3 gap-3">
						<Button variant="primary_outline" onClick={handleTogglePin}>
							{active
							 ? <PinOff size={20}/>
							 : <Pin size={20}/>}
						</Button>
						<Button onClick={handleEditLesson}
								variant="primary_outline">
							<Pencil size={20}/>
						</Button>
						<Button variant="danger_outline">
							<Trash2 size={20}/>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonItem;