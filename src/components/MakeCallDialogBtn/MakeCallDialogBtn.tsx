import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/Dialog/Dialog.tsx";
import {Button} from "../ui/Button/Button.tsx";
import {PhoneOutgoing} from "lucide-react";
import {Separator} from "../ui/Separator/Separator.tsx";
import PreJoin from "../PreJoin/PreJoin.tsx";

const MakeCallDialogBtn = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="gap-2 flex">
					<PhoneOutgoing size={20}/>
					<span className="flex-grow">Сделать звонок</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Сделать звонок
					</DialogTitle>
					<DialogDescription>
						Сделайте звонок всем ученикам в классе
					</DialogDescription>
				</DialogHeader>
				<Separator></Separator>
				<PreJoin/>
				<DialogFooter>
					<Button className="w-full mt-4">
						Сделать звонок
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default MakeCallDialogBtn;