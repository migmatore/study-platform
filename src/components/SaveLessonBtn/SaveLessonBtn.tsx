import {Save} from "lucide-react";
import Button from "../ui/Button/Button.tsx";

const SaveLessonBtn = () => {
	return (
		<div>
			<Button className="flex gap-2 border bg-primary hover:bg-secondary text-background hover:text-background">
				<Save size={20}/>
				Сохранить
			</Button>
		</div>
	);
};

export default SaveLessonBtn;