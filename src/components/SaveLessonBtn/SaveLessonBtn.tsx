import {Save} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";

const SaveLessonBtn = () => {
	return (
		<div>
			<Button className="gap-2">
				<Save size={20}/>
				Сохранить
			</Button>
		</div>
	);
};

export default SaveLessonBtn;