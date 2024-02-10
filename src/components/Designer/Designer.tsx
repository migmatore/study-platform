import DesignerSidebar from "../DesignerSidebar/DesignerSidebar.tsx";
import {useDroppable} from "@dnd-kit/core";

const Designer = () => {
	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		}
	})

	return (
		<div className="flex w-full h-full gap-3">
			<div className="p-4 w-full">
				<div className="bg-white border max-w-[920px] h-full m-auto rounded-lg flex flex-col flex-grow items-center
					justify-start flex-1 overflow-y-auto">
					<p className="text-3xl flex flex-grow items-center font-bold">Перетащить сюда</p>
				</div>
			</div>
			<DesignerSidebar/>
		</div>
	)
}

export default Designer;