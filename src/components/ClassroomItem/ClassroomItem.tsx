import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "../ui/Button/Button.tsx";
import {LogIn, Trash2} from "lucide-react";

interface Props {
	id: number;
	title: string;
	description: string;
}

const ClassroomItem = ({id, title, description}: Props) => {
	const navigate = useNavigate();

	const handleInside = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		navigate(`${id}/lessons`)
	}

	return (
		<div className="flex justify-between border p-5 rounded-lg">
			<div>
				<h2 className="text-xl">{title}</h2>
				{description && <p className="mt-2.5">{description}</p>}
			</div>
			<div className="flex justify-center items-center gap-3">
				<Button onClick={handleInside} className="bg-blue-400 hover:bg-blue-500 text-white">
					<div className="flex gap-2">
						<LogIn size={20}/><p className="text-white">Перейти</p>
					</div>
				</Button>
				<Button className="bg-white border border-red-400 text-red-400 hover:text-white hover:bg-red-500">
					<Trash2 size={20}/>
				</Button>
			</div>
		</div>
	);
}

export default ClassroomItem;