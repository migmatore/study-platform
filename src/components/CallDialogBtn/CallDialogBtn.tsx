import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/Dialog/Dialog.tsx";
import {Button} from "../ui/Button/Button.tsx";
import {PhoneOutgoing} from "lucide-react";
import {Separator} from "../ui/Separator/Separator.tsx";
import PreJoin from "../PreJoin/PreJoin.tsx";
import {SendJsonMessage} from "react-use-websocket/dist/lib/types";
import {MessageType} from "../../types/realTime.ts";
import useAuth from "../../hooks/useAuth.tsx";
import {Roles} from "../../types/roles.ts";

interface Props {
	classroomId: number;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	sendJsonMessage?: SendJsonMessage;
}

const CallDialogBtn = ({classroomId, open, onOpenChange, sendJsonMessage}: Props) => {
	const {role} = useAuth();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{role === Roles.Teacher ? (
				<DialogTrigger asChild>
					<Button className="gap-2 flex">
						<PhoneOutgoing size={20}/>
						<span className="flex-grow">
						Сделать звонок
					</span>
					</Button>
				</DialogTrigger>
			) : null}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{role === Roles.Teacher ? "Сделать звонок" : null}
						{role === Roles.Student ? "Звонок от учителя" : null}
					</DialogTitle>
					{role === Roles.Teacher ? (
						<DialogDescription>
							Сделайте звонок всем ученикам в классе
						</DialogDescription>
					) : null}
				</DialogHeader>
				<Separator></Separator>
				<PreJoin/>
				<DialogFooter>
					{role === Roles.Teacher ? (
						<Button className="w-full mt-4" onClick={() => {
							if (sendJsonMessage) {
								sendJsonMessage({type: MessageType.Call, classroom_id: classroomId});
							}
						}}>
							Сделать звонок
						</Button>
					) : null}
					{role === Roles.Student ? (
						<Button className="w-full mt-4">
							Ответить
						</Button>
					) : null}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CallDialogBtn;