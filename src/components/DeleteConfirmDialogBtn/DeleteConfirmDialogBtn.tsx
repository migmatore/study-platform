import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/AlertDialog/AlertDialog.tsx";
import {useState} from "react";
import {Trash2} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";

interface Props {
	title?: string;
	description?: string;
	error?: string | null;
	onCancel?: () => void;
	onDelete: () => void;
}

const DeleteConfirmDialogBtn = ({title = "Удаление", description, error, onCancel, onDelete}: Props) => {
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
				{error &&
                    <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center">
                        <h3 className="text-lg">Ошибка удаления</h3>
                        <p>{error}</p>
                    </div>
				}
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>Отмена</AlertDialogCancel>
					<Button variant="default" onClick={onDelete} disabled={error !== null}>
						Удалить
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteConfirmDialogBtn;