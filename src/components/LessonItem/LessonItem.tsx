import Button from "../ui/Button/Button.tsx";
import {cn} from "../../utils"
import {LogIn, Pencil, Pin, PinOff, Trash2} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";

interface Props {
	id: number;
	title: string;
	active: boolean
}

const LessonItem = ({id, title, active}: Props) => {
	const navigate = useNavigate();

	const handleEditLesson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		navigate(`${id}/edit`);
	}

	return (
		<div className={cn('flex flex-col flex-grow-0 shrink basis-[24%] border p-5 rounded-lg items-center gap-4',
			{'border-blue-400': active})}>
			<div>
				<h2 className="text-lg break-words mb-auto text-center text-gray-600">{title}</h2>
			</div>
			<div className="flex flex-col justify-center items-center mt-auto">
				<div className="grid grid-cols-1 gap-3">
					<Button className="w-full text-white bg-blue-400 hover:bg-blue-500">
						<div className="flex gap-2 justify-center">
							<LogIn size={20}/><p className="text-white">Перейти</p>
						</div>
					</Button>
					<div className="grid grid-cols-3 gap-3">
						{active ?
							<Button className="bg-white border border-blue-400 text-blue-500 hover:text-white hover:bg-blue-500">
								<PinOff size={20}/>
							</Button>
							:
							<Button className="bg-white border border-blue-400 text-blue-500 hover:text-white hover:bg-blue-500">
								<Pin size={20}/>
							</Button>
						}
						<Button onClick={handleEditLesson}
								className="bg-white border border-blue-400 text-blue-500 hover:text-white hover:bg-blue-500">
							<Pencil size={20}/>
						</Button>
						<Button className="bg-white border border-red-400 hover:bg-red-500 text-red-500 hover:text-white">
							<Trash2 size={20}/>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LessonItem;