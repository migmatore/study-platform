import {createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {LessonType} from "../types/lesson.ts";
import classroomService from "../services/classroom.service.ts";
import {useParams} from "react-router-dom";
import {AxiosError} from "axios";

type LessonsContextType = {
	lessons: LessonType[];
	fetchError: string | null;
	isLoading: boolean;
	fetchLessons: (classroomId: number | string) => Promise<void>;
	setLessons: Dispatch<SetStateAction<LessonType[]>>;
	appendLesson: (lesson: LessonType) => void;
	updateLesson: (id: number, lesson: LessonType) => void;
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
		}

		getLessons().catch(console.error);
	}, [classroomId]);

	const fetchLessons = async (classroomId: number | string) => {
		console.log("fetch lessons")

		try {
			const resp = await classroomService.getLessons(classroomId);
			console.log(resp.data);

			setLessons(resp.data.map(el => {
				return {
					id: el.id,
					title: el.title,
					classroomId: el.classroomId,
					content: el.content,
					active: el.active,
				};
			}));
		} catch (error) {
			console.log(error);
		}
	};

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

	const contextValue = useMemo(
		() => ({
			lessons,
			fetchError,
			isLoading,
			fetchLessons,
			setLessons,
			appendLesson,
			updateLesson,
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