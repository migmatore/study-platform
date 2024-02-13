import {LessonElementInstance} from "../components/LessonElements/LessonElements.tsx";
import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";

type DesignerContextType = {
	elements: LessonElementInstance[];
	addElement: (index: number, element: LessonElementInstance) => void;
	removeElement: (id: string) => void;

	selectedElement: LessonElementInstance | null;
	setSelectedElement: Dispatch<SetStateAction<LessonElementInstance | null>>

	updateElement: (id: string, element: LessonElementInstance) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

const DesignerProvider = ({children}: PropsWithChildren) => {
	const [elements, setElements] = useState<LessonElementInstance[]>([]);
	const [selectedElement, setSelectedElement] = useState<LessonElementInstance | null>(null);

	const addElement = (index: number, element: LessonElementInstance) => {
		setElements(prev => {
			const newElements = [...prev];
			newElements.splice(index, 0, element);

			return newElements;
		});
	};

	const removeElement = (id: string) => {
		setElements(prev => prev.filter(element => element.id !== id));
	};

	const updateElement = (id: string, element: LessonElementInstance) => {
		setElements(prev => {
			const newElements = [...prev];
			const index = newElements.findIndex(el => el.id === id);
			newElements[index] = element;

			return newElements;
		});
	};

	return <DesignerContext.Provider value={{
		elements,
		addElement,
		removeElement,
		selectedElement,
		setSelectedElement,
		updateElement,
	}}>{children}</DesignerContext.Provider>;
};

export default DesignerProvider;