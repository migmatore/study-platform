import {createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {LessonType} from "../types/lesson.ts";
import classroomService from "../services/classroom.service.ts";
import {useParams} from "react-router-dom";
import {AxiosError} from "axios";
import lessonService from "../services/lesson.service.ts";

type LessonsContextType = {
	lessons: LessonType[];
	fetchError: string | null;
	isLoading: boolean;
	setLessons: Dispatch<SetStateAction<LessonType[]>>;
	appendLesson: (lesson: LessonType) => void;
	updateLesson: (id: number, lesson: LessonType) => void;
	deleteLesson: (id: number) => Promise<void>;
	setActiveLesson: (id: number) => void;
	getLesson: (id: number) => LessonType | undefined;
}

export const LessonsContext = createContext<LessonsContextType | null>(null);

type Params = {
	classroomId: string;
}

const LessonsProvider = ({children}: PropsWithChildren) => {
	const {classroomId} = useParams<Params>();
	const [lessons, setLessons] = useState<LessonType[]>([]);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getLessons = async () => {
			if (classroomId === undefined) return;

			try {
				const resp = await classroomService.getLessons(classroomId);

				setIsLoading(false);
				setLessons(resp.data.map(el => {
					return {
						id: el.id,
						title: el.title,
						classroomId: el.classroomId,
						content: el.content,
						active: el.active,
					};
				}));
			} catch (e) {
				const error = e as AxiosError;
				setIsLoading(false);
				setFetchError("Ошибка получения уроков");
				console.log(error);
			}
		};

		getLessons().catch(console.error);
	}, [classroomId]);

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

	const getLesson = (id: number): LessonType | undefined => {
		return lessons.find(lesson => lesson.id === id);
	};

	const deleteLesson = async (lessonId: number) => {
		const resp = await lessonService.deleteLesson(lessonId);

		if (resp.status === 200) {
			setLessons(prev => prev.filter((l) => l.id !== lessonId));
		}
	};

	const contextValue: LessonsContextType | null = useMemo(
		() => ({
			lessons,
			fetchError,
			isLoading,
			setLessons,
			appendLesson,
			updateLesson,
			deleteLesson,
			setActiveLesson,
			getLesson,
		}),
		[lessons, fetchError, isLoading],
	);

	return <LessonsContext.Provider value={contextValue}>
		{children}
	</LessonsContext.Provider>;
};

export default LessonsProvider;