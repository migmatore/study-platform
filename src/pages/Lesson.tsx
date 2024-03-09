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

type Params = {
	classroomId: string;
	lessonId: string;
}

const Lesson = () => {
	const {role, wsToken} = useAuth();
	const {classroomId, lessonId} = useParams<Params>();
	const [lesson, setLesson] = useState<LessonType | null>(null);

	const dataFetchRef = useRef<boolean>(false);

	const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

	const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket<{
		type: number,
		classroom_id: number,
		element_id: string
	}>("ws://localhost:8082/ws", {
		shouldReconnect: () => !didUnmount.current,
		reconnectAttempts: 5,
		reconnectInterval: 1000,
	});
	const didUnmount = useRef(false);

	useEffect(() => {
		if (role === Roles.Student) {
			itemsRef.current = itemsRef.current.slice(0, lesson?.content?.length);
		}

		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getLesson = async () => {
			if (!lesson && classroomId !== undefined && lessonId !== undefined) {
				try {
					let resp: AxiosResponse<ILessonsResp, any> | null = null;

					if (role === Roles.Student) {
						resp = await LessonService.getCurrentLesson(classroomId);
					} else if (role === Roles.Teacher) {
						resp = await LessonService.getLesson(lessonId);
					}

					if (resp && resp.status === 200) {
						setLesson({
							id: resp.data.id,
							title: resp.data.title,
							classroomId: resp.data.classroomId,
							content: resp.data.content,
							active: resp.data.active,
						});
					}
				} catch (e) {
					const error = e as AxiosError;
					console.log(error);
				}
			}
		};

		getLesson().catch(console.error);
	}, []);

	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			sendJsonMessage({
				type: 1,
				token: wsToken,
			});
		}
	}, [readyState]);

	useEffect(() => {
		if (role === Roles.Student && lastJsonMessage) {
			const index = lesson?.content?.findIndex(el => el.id === lastJsonMessage.element_id);

			const basicClassName = itemsRef.current[index!]!.className;

			itemsRef.current[index!]!.className = "rounded-lg bg-blue-200 text-blue-500 p-3 ring-0";
			itemsRef.current[index!]!.scrollIntoView({behavior: "smooth", block: "center"});

			setTimeout(() => {
				itemsRef.current[index!]!.className = basicClassName;
			}, 3000);
		}

		return () => {
			didUnmount.current = false;
		};
	}, [lastJsonMessage]);

	return (
		<div className="w-full flex flex-col">
			<div className="flex bg-background  p-4 border-b gap-4 items-center sticky top-0 z-50">
				<BackBtn/>
				<h1 className="text-2xl">Урок: {lesson?.title}</h1>
			</div>
			<div
				className="w-full h-full flex flex-col flex-grow items-center justify-center bg-background
					overflow-y-auto">
				{/*<div className="flex w-full h-full gap-3">*/}
				{/*	<div className="p-4 w-full">*/}
				{/*		<div className="bg-background border max-w-[920px] h-full m-auto rounded-lg flex flex-col*/}
				{/*			flex-grow items-center justify-start flex-1 overflow-y-auto p-8">*/}
				{/*			{lesson?.content?.map(element => {*/}
				{/*				const LessonComponent = LessonElements[element.type].lessonComponent;*/}

				{/*				return <LessonComponent key={element.id} elementInstance={element}/>;*/}
				{/*			})}*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
				<div className="w-full h-full">
					<div className="bg-background flex flex-col flex-grow items-center justify-center
					p-4 overflow-y-auto">
						<div className="max-w-[920px] flex flex-col gap-4 flex-grow bg-background border w-full rounded-lg p-8
						overflow-y-auto">
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
							 : <div>Error fetching lesson content</div>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Lesson;