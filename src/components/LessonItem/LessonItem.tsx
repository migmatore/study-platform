import {cn} from "../../utils";
import {LogIn, Pencil, Pin, PinOff, Trash2} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../ui/Button/Button.tsx";

interface Props {
	id: number;
	title: string;
	active: boolean;
}

const LessonItem = ({id, title, active}: Props) => {
	const navigate = useNavigate();

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
					<Button>
						<div className="flex gap-2 justify-center">
							<LogIn size={20}/>
							<p>Перейти</p>
						</div>
					</Button>
					<div className="grid grid-cols-3 gap-3">
						{active ?
						 <Button variant="primary_outline">
							 <PinOff size={20}/>
						 </Button>
								:
						 <Button variant="primary_outline">
							 <Pin size={20}/>
						 </Button>
						}
						<Button onClick={handleEditLesson}
								variant="primary_outline">
							<Pencil size={20}/>
						</Button>
						<Button variant="attention_outline">
							<Trash2 size={20}/>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonItem;