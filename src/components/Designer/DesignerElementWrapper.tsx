import {LessonElementInstance, LessonElements} from "../LessonElements/LessonElements.tsx";
import {useDraggable, useDroppable} from "@dnd-kit/core";
import {useState} from "react";
import {Trash2} from "lucide-react";
import useDesigner from "../../hooks/useDesigner.tsx";
import {cn} from "../../utils";

interface Props {
	element: LessonElementInstance;
}

const DesignerElementWrapper = ({element}: Props) => {
	const {removeElement, setSelectedElement} = useDesigner();

	const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

	const topHalf = useDroppable({
		id: element.id + "-top",
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfDesignerElement: true,
		},
	});

	const bottomHalf = useDroppable({
		id: element.id + "-bottom",
		data: {
			type: element.type,
			elementId: element.id,
			isBottomHalfDesignerElement: true,
		},
	});

	const draggable = useDraggable({
		id: element.id + "-drag-handler",
		data: {
			type: element.id,
			elementId: element.id,
			isDesignerElement: true,
		},
	});

	if (draggable.isDragging) return null;

	const DesignerElement = LessonElements[element.type].designerComponent;

	return (
		<div ref={draggable.setNodeRef}
			 {...draggable.listeners}
			 {...draggable.attributes}
			 className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-lg ring-1 ring-gray-200/80 dark:ring-accent"
			 onMouseEnter={() => setMouseIsOver(true)}
			 onMouseLeave={() => setMouseIsOver(false)}
			 onClick={(e) => {
				 e.stopPropagation();
				 setSelectedElement(element);
			 }}
		>
			<div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-lg"/>
			<div ref={bottomHalf.setNodeRef} className="absolute w-full h-1/2 bottom-0 rounded-b-lg"/>
			{topHalf.isOver && (
				<div className="absolute top-0 w-full rounded-lg h-[7px] bg-blue-300 rounded-b-none"/>
			)}
			<div className={cn(
				"flex w-full h-[120px] items-center bg-white/40 dark:bg-accent rounded-lg px-4 py-2 pointer-events-none opacity-100",
				!mouseIsOver && "opacity-30",
			)}>
				<DesignerElement elementInstance={element}/>
			</div>
			{bottomHalf.isOver && (
				<div className="absolute bottom-0 w-full rounded-lg h-[7px] bg-blue-300 rounded-t-none"/>
			)}
			{!mouseIsOver && (
				// <div className="absolute w-full h-full bg-[linear-gradient(45deg,_#000_25%,_transparent_25%,_transparent_50%,_#000_50%,_#000_75%,_transparent_75%,_#fff)] bg-auto">
				<div className="absolute w-full h-full">
					<div className="absolute right-0 h-full">
						<button className="flex justify-center items-center h-full rounded-lg rounded-l-none bg-red-400
							hover:bg-red-500 transition-all duration-300 px-5 py-2.5 text-center text-sm font-medium"
								onClick={(e) => {
									e.stopPropagation();
									removeElement(element.id);
								}}
						>
							<Trash2 className="text-white w-6 h-6"/>
						</button>
					</div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
						<p className="text-muted-foreground text-sm">
							Нажмите чтобы увидеть настройки элемента или перетяните его
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DesignerElementWrapper;