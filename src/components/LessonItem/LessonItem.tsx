import Button from "../Button/Button.tsx";
import {cn} from "../../utils"
import {LogIn, Pencil, Pin, PinOff, Trash2} from "lucide-react";

interface Props {
	id: number;
	title: string;
	active: boolean
}

const LessonItem = ({title, active}: Props) => {

	return (
		<div className={cn('flex flex-col flex-grow-0 shrink basis-[24%] border p-5 rounded-lg items-center gap-4',
			{'border-indigo-400': active})}>
			<div>
				<h2 className="text-sm break-words mb-auto">{title}</h2>
			</div>
			<div className="flex flex-col justify-center items-center mt-auto">
				<div className="grid grid-cols-1 gap-3">
					<Button className="w-full text-white">
						<div className="flex gap-2 justify-center">
							<LogIn size={20}/><p className="text-white">Перейти</p>
						</div>
					</Button>
					<div className="grid grid-cols-3 gap-3">
						{active ?
							<Button className="bg-white border border-indigo-400 text-indigo-500 hover:text-white">
								<PinOff size={20}/>
							</Button>
							:
							<Button className="bg-white border border-indigo-400 text-indigo-500">
								<Pin size={20}/>
							</Button>
						}
						<Button className="bg-white border border-indigo-400 text-indigo-500 hover:text-white">
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