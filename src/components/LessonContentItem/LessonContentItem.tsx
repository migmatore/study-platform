import React, {PropsWithChildren, useState} from "react";
import {cn} from "../../utils";
import useAuth from "../../hooks/useAuth.tsx";
import {Roles} from "../../types/roles.ts";
import {FaEllipsis} from "react-icons/fa6";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/DropdownMenu/DropdownMenu.tsx";
import {SendJsonMessage} from "react-use-websocket/dist/lib/types";
import {isMobile} from "react-device-detect";

interface IProps extends PropsWithChildren {
	send?: SendJsonMessage | null;
	classroomId: number;
	elementId: string;
}

const LessonContentItem = React.forwardRef<HTMLDivElement, IProps>((
	{children, send, classroomId, elementId}: IProps,
	ref,
) => {
	const {role} = useAuth();
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handlePointer = () => {
		if (!send) {
			return;
		}

		send({type: 2, classroom_id: classroomId, element_id: elementId});
	}

	return (
		<div ref={ref}
			 className={cn(
				 "relative p-3 flex-grow",
				 {"ring-1 rounded-lg ring-blue-200": (isHover || isOpen || isMobile) && (role === Roles.Teacher)},
			 )}
			 onMouseEnter={() => setIsHover(true)}
			 onMouseLeave={() => setIsHover(false)}>
			{children}
			{role === Roles.Teacher ?
			 <div className={cn(
				 "absolute invisible top-0 right-0 pt-0.5 px-2 rounded-lg cursor-pointer group text-primary  hover:bg-blue-200 hover:text-blue-600 dark:hover:bg-blue-800 dark:hover:text-blue-950",
				 {"visible": isHover || isOpen || isMobile},
			 )}>
				 <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
					 <DropdownMenuTrigger>
						 <div className="w-full h-full flex justify-center items-center">
							 <FaEllipsis className="focus:outline-none"/>
						 </div>
					 </DropdownMenuTrigger>
					 <DropdownMenuContent>
						 <DropdownMenuItem onClick={handlePointer}>
							 Указать
						 </DropdownMenuItem>
					 </DropdownMenuContent>
				 </DropdownMenu>
			 </div> : null}

		</div>
	);
});

export default LessonContentItem;