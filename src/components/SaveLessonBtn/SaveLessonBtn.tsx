import {Save} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";
import {useTransition} from "react";
import lessonService from "../../services/lesson.service.ts";
import {ImSpinner2} from "react-icons/im";
import useDesigner from "../../hooks/useDesigner.tsx";

interface Props {
	lessonId: string;
	classroomId: string;
}

const SaveLessonBtn = ({lessonId, classroomId}: Props) => {
	const {elements} = useDesigner();

	const [loading, startTransition] = useTransition();

	const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		startTransition(() => {

			lessonService.updateLesson(
				classroomId,
				{lessonId: Number(lessonId), content: elements},
			)
				.then(resp => console.log(resp))
				.catch(err => console.error(err));
		});
	};

	return (
		<div>
			<Button className="gap-2" onClick={(e) => handleSave(e)}>
				<Save size={20}/>
				<span>Сохранить</span>
				{loading && (
					<ImSpinner2 className="animate-spin"/>
				)}
			</Button>
		</div>
	);
};

export default SaveLessonBtn;