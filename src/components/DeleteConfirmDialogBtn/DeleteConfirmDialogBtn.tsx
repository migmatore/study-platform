import {
	AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../ui/AlertDialog/AlertDialog.tsx";
import {useState} from "react";
import {Trash2} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";

interface Props {
	title?: string;
	description?: string;
}

const DeleteConfirmDialogBtn = ({title = "Удаление", description}: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="danger_outline">
					<Trash2 size={20}/>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="z-50">
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description ?? <AlertDialogDescription>{description}</AlertDialogDescription>}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>Удалить</AlertDialogAction>
					<AlertDialogCancel>Отмена</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteConfirmDialogBtn;