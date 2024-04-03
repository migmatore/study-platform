import {useParams} from "react-router-dom";
import {LessonElements} from "../components/LessonElements/LessonElements.tsx";
import BackBtn from "../components/BackBtn/BackBtn.tsx";
import {useEffect, useRef, useState} from "react";
import useAuth from "../hooks/useAuth.tsx";
import LessonContentItem from "../components/LessonContentItem/LessonContentItem.tsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {Roles} from "../types/roles.ts";
import {ILessonsResp, LessonType} from "../types/lesson.ts";
import LessonService from "../services/lesson.service.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ImSpinner2} from "react-icons/im";
import MakeCallDialogBtn from "../components/MakeCallDialogBtn/MakeCallDialogBtn.tsx";

type Params = {
	classroomId: string;
	lessonId: string;
}

const Lesson = () => {
	const {role, wsToken} = useAuth();
	const {classroomId, lessonId} = useParams<Params>();

	const [lesson, setLesson] = useState<LessonType | null>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

	const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket<{
		type: number,
		classroom_id: number,
		element_id: string
	}>("ws://localhost:8082/ws", {
		//share: true,
		shouldReconnect: () => didUnmount.current === false,
		reconnectAttempts: 5,
		reconnectInterval: 1000,
	});
	const didUnmount = useRef(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getLesson = async () => {
			if (classroomId !== undefined && lessonId !== undefined) {
				try {
					let resp: AxiosResponse<ILessonsResp, any> | null = null;

					if (role === Roles.Student) {
						resp = await LessonService.getCurrentLesson(classroomId);
					} else if (role === Roles.Teacher) {
						resp = await LessonService.getLesson(lessonId);
					}

					if (resp && resp.status === 200) {
						setIsLoading(false);

						const data: LessonType = {
							id: resp.data.id,
							title: resp.data.title,
							classroomId: resp.data.classroomId,
							content: resp.data.content,
							active: resp.data.active,
						};

						setLesson(data);

						if (!data.content || data.content.length === 0) {

							switch (role) {
								case Roles.Teacher:
									setFetchError("Отсутствует контент урока");
									break;
								case Roles.Student:
									setFetchError("Отсутствует контент урока, обратитесь к преподавателю");
									break;
							}

							return;
						}

						if (role === Roles.Student) {
							itemsRef.current = itemsRef.current.slice(0, data.content.length);
						}
					}
				} catch (e) {
					const error = e as AxiosError;
					setIsLoading(false);
					setFetchError("Ошибка получения урока");
					console.log(error);
				}
			}
		};

		getLesson().catch(console.error);
	}, [lessonId, classroomId, role, lesson]);

	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			sendJsonMessage({
				type: 1,
				token: wsToken,
			});
		}
	}, [readyState]);

	useEffect(() => {
		if (lastJsonMessage) {
			const index = lesson?.content?.findIndex(el => el.id === lastJsonMessage.element_id);

			const basicClassName = itemsRef.current[index!]!.className;

			itemsRef.current[index!]!.className = "rounded-lg bg-blue-200 text-blue-500 p-3 ring-0";
			itemsRef.current[index!]!.scrollIntoView({behavior: "smooth", block: "center"});

			setTimeout(() => {
				itemsRef.current[index!]!.className = basicClassName;
			}, 3000);
		}
	}, [lastJsonMessage]);

	useEffect(() => {
		return () => {
			didUnmount.current = true;
		};
	}, []);

	return (
		<div className="w-full flex flex-col">
			<div className="flex bg-background  p-4 border-b gap-4 items-center sticky top-0 z-50">
				<BackBtn/>
				<h1 className="text-2xl">Урок: {lesson?.title}</h1>
			</div>
			<div
				className="w-full h-full flex flex-grow justify-center bg-background">
				<div className="w-full overflow-y-auto">
					{isLoading ? (
						<div className="w-full h-screen flex justify-center items-center">
							<ImSpinner2 className="text-muted-foreground w-8 h-8 animate-spin"/>
						</div>
					) : (
						 <>
							 {fetchError ? (
								 <div className="flex m-4 flex-col bg-red-100 border border-destructive
								 	rounded-lg text-destructive p-5 justify-center items-center">
									 <h3 className="text-lg">Ошибка</h3>
									 <p>{fetchError}</p>
								 </div>
							 ) : (
								  <div className="bg-background flex flex-col flex-grow items-center justify-center
								  	p-4 overflow-y-auto">
									  <div className="max-w-[920px] flex flex-col gap-4 flex-grow bg-background border
									  	w-full rounded-lg p-8 overflow-y-auto">
										  {lesson && lesson.content
										   ? lesson.content.map((element, i) => {
												  const LessonComponent = LessonElements[element.type].lessonComponent;

												  return <LessonContentItem key={element.id}
																			send={sendJsonMessage}
																			classroomId={Number(classroomId)}
																			elementId={element.id}
																			ref={el => itemsRef.current[i] = el}>
													  <LessonComponent elementInstance={element}/>
												  </LessonContentItem>;
											  })
										   : null}
									  </div>
								  </div>
							  )}
						 </>
					 )}
				</div>
				<div className="h-[calc(100vh-81px)] min-w-fit sticky top-[81px] mr-4 overflow-y-scroll">
					{/*<PreJoin/>*/}
					<div className="w-full flex flex-col items-center justify-center border rounded-lg p-4">
							<MakeCallDialogBtn/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Lesson;