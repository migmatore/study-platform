import {LessonElementInstance} from "../components/LessonElements/LessonElements.tsx";
import {createContext, PropsWithChildren, useState} from "react";

type DesignerContextType = {
	elements: LessonElementInstance[];
	addElement: (index: number, element: LessonElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

const DesignerProvider = ({children}: PropsWithChildren) => {
	const [elements, setElements] = useState<LessonElementInstance[]>([])

	const addElement = (index: number, element: LessonElementInstance) => {
		setElements(prev => {
			const newElements = [...prev];
			newElements.splice(index, 0, element)

			return newElements
		})
	}

	return <DesignerContext.Provider value={{elements, addElement}}>{children}</DesignerContext.Provider>
}

export default DesignerProvider;