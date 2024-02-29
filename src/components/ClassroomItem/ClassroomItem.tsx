import React from "react";
import {useNavigate} from "react-router-dom";
import {LogIn, Trash2} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";

interface Props {
	id: number;
	title: string;
	description: string;
}

const ClassroomItem = ({id, title, description}: Props) => {
	const navigate = useNavigate();

	const handleGoToClassroom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		navigate(`${id}/lessons`);
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
		</div>
	);
};

export default ClassroomItem;