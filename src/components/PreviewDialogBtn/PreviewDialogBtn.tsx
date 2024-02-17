import {Dialog, DialogContent, DialogTrigger} from "../ui/Dialog/Dialog.tsx";
import {ScanEye} from "lucide-react";
import useDesigner from "../../hooks/useDesigner.tsx";
import {LessonElements} from "../LessonElements/LessonElements.tsx";
import {Button} from "../ui/Button/Button.tsx";

const PreviewDialogBtn = () => {
	const {elements} = useDesigner();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline"
						className="flex gap-2 border">
					<ScanEye size={20}/>
					Предварительный просмотр
				</Button>
			</DialogTrigger>
			<DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
				<div className="px-4 py-2 border-b">
					<p className="text-lg font-bold text-gray-600">
						Предварительный просмотр урока
					</p>
					<p className="text-sm text-muted-foreground">
						Это то, как Ваш урок будет выглядеть для учеников
					</p>
				</div>
				<div className="bg-background flex flex-col flex-grow items-center justify-center
					p-4 bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)] overflow-y-auto">
					<div className="max-w-[920px] flex flex-col gap-4 flex-grow bg-background border w-full rounded-lg p-8
						overflow-y-auto">
						{elements.map(element => {
							const LessonComponent = LessonElements[element.type].lessonComponent;

							return <LessonComponent key={element.id} elementInstance={element}/>;
						})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PreviewDialogBtn;