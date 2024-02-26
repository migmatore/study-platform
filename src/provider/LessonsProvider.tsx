import {createContext, Dispatch, PropsWithChildren, SetStateAction, useMemo, useState} from "react";
import {LessonType} from "../types/lesson.ts";

type LessonsContextType = {
	lessons: LessonType[];
	setLessons: Dispatch<SetStateAction<LessonType[]>>;
	appendLesson: (lesson: LessonType) => void;
	updateLesson: (id: number, lesson: LessonType) => void
	setActiveLesson: (id: number) => void;
}

export const LessonsContext = createContext<LessonsContextType | null>(null);

const LessonsProvider = ({children}: PropsWithChildren) => {
	const [lessons, setLessons] = useState<LessonType[]>([]);

	const appendLesson = (lesson: LessonType) => {
		setLessons(prev => [...prev, lesson]);
	};

	const updateLesson = (id: number, lesson: LessonType) => {
		const newLessons = lessons.map(item => {
			if (item.id !== id) {
				return item;
			}

			return {...item, ...lesson};
		});

		setLessons(newLessons);
	};

	const setActiveLesson = (id: number) => {
		const newLessons = lessons.map(item => {
			if (!item.active) {
				if (item.id === id) {
					return {...item, active: true};
				}

				return item;
			}

			return {...item, active: false};
		});

		setLessons(newLessons);
	};

	const contextValue = useMemo(
		() => ({
			lessons,
			setLessons,
			appendLesson,
			updateLesson,
			setActiveLesson,
		}),
		[lessons, updateLesson, setActiveLesson],
	);

	return <LessonsContext.Provider value={contextValue}>
		{children}
	</LessonsContext.Provider>;
};

export default LessonsProvider;