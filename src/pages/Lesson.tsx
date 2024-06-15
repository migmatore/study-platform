import {useParams} from "react-router-dom";
import {LessonElements} from "../components/LessonElements/LessonElements.tsx";
import BackBtn from "../components/BackBtn/BackBtn.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import useAuth from "../hooks/useAuth.tsx";
import LessonContentItem from "../components/LessonContentItem/LessonContentItem.tsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {Roles} from "../types/roles.ts";
import {ILessonsResp, LessonType} from "../types/lesson.ts";
import LessonService from "../services/lesson.service.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ImSpinner2} from "react-icons/im";
import {ErrorType, MessageType, RealtimeMsg} from "../types/realTime.ts";
import CallDialogBtn from "../components/CallDialogBtn/CallDialogBtn.tsx";
import {Menu} from "lucide-react";
import {Button} from "../components/ui/Button/Button.tsx";
import useSidebar from "../hooks/useSidebar.tsx";
import authService from "../services/auth.service.ts";
import {camelizeKeys} from "humps";
import {LiveKitRoom, RoomAudioRenderer, useTracks} from "@livekit/components-react";
import {Track} from "livekit-client";
//import "@livekit/components-styles";
import ControlBar from "../components/ControlBar/ControlBar.tsx";
import {ParticipantTile} from "../components/ParticipantTile/ParticipanTile.tsx";

type Params = {
	classroomId: string;
	lessonId: string;
}

const Lesson = () => {
	const {
		role,
		wsToken,
		refreshToken,
		setToken,
		setRefreshToken,
		setWsToken,
	} = useAuth();
	const {classroomId, lessonId} = useParams<Params>();
	const {toggleMobileExpanded} = useSidebar();

	const [lesson, setLesson] = useState<LessonType | null>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	const [isCall, setIsCall] = useState<boolean>(false);
	const [isAnswered, setIsAnswered] = useState<boolean>(false);

	const [lkToken, setLKToken] = useState<string | null>(null);

	const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

	const didUnmount = useRef(false);

	const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket<RealtimeMsg>(
		"https://d88d-85-172-92-2.ngrok-free.app/ws",
		{
			//share: true,
			shouldReconnect: () => !didUnmount.current,
			reconnectAttempts: 5,
			reconnectInterval: 1000,
		},
	);

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

		return () => {
			didUnmount.current = true;
		};
	}, [lessonId, classroomId, role, lesson]);

	useEffect(() => {
		switch (readyState) {
			case ReadyState.OPEN:
				sendJsonMessage({
					type: 1,
					token: wsToken,
				});
		}
	}, [readyState]);

	useEffect(() => {
		if (!lastJsonMessage) return;

		const msg = camelizeKeys<RealtimeMsg>(lastJsonMessage);

		if (msg.type === MessageType.Error && msg.ErrorType === ErrorType.ExpiredToken) {
			authService.refreshToken(refreshToken!)
				.then(resp => {
					if (resp && resp.status === 200) {
						if (setToken) {
							setToken(resp.data.token);
						}

						if (setWsToken) {
							setWsToken(resp.data.wsToken);
						}

						if (setRefreshToken) {
							setRefreshToken(resp.data.refreshToken);
						}
					}
				})
				.catch(console.error);
		}

		if (role === Roles.Student) {
			switch (msg.type) {
				case MessageType.VirtualPointer: {
					const {elementId} = msg;

					const index = lesson?.content?.findIndex(el => el.id === elementId);

					const basicClassName = itemsRef.current[index!]!.className;

					itemsRef.current[index!]!.className = "rounded-lg bg-blue-200 text-blue-500 p-3 ring-0";
					itemsRef.current[index!]!.scrollIntoView({behavior: "smooth", block: "center"});

					setTimeout(() => {
						itemsRef.current[index!]!.className = basicClassName;
					}, 3000);
					break;
				}
				case MessageType.Call:
					setIsCall(true);
			}
		}

		if (msg.type === MessageType.NewRoom && msg.joinToken) {
			if (role === Roles.Teacher) {
				setIsAnswered(true);
			}

			setLKToken(msg.joinToken);
		}
	}, [lastJsonMessage]);

	const handleCallAnswer = () => {
		setIsCall(false);
		setIsAnswered(true);
	};

	return (
		<div className="w-full flex flex-col">
			<div className="flex bg-background  p-4 border-b gap-4 items-center sticky top-0 z-[49]">
				<Button className="sm:hidden" variant="outline" size="icon" onClick={toggleMobileExpanded}>
					<Menu size={20}/>
				</Button>
				<BackBtn/>
				<h1 className="text-2xl">Урок: {lesson?.title}</h1>
			</div>
			<div
				className="w-full h-full flex flex-grow sm:flex-row flex-col-reverse gap-4 justify-center p-4 bg-background">
				<div className="w-full overflow-y-auto">
					{isLoading ? (
						<div className="w-full h-screen flex justify-center items-center">
							<ImSpinner2 className="text-muted-foreground w-8 h-8 animate-spin"/>
						</div>
					) : (
						 <>
							 {fetchError ? (
								 <div className="flex m-4 mt-0 flex-col bg-red-100 border border-destructive
								 	rounded-lg text-destructive p-5 justify-center items-center">
									 <h3 className="text-lg">Ошибка</h3>
									 <p>{fetchError}</p>
								 </div>
							 ) : (
								  <div className="bg-background flex flex-col flex-grow items-center justify-center
								  	overflow-y-auto">
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
				{role === Roles.Teacher ? (
					<div className="sm:h-[calc(100vh-81px)] sm:min-w-fit sm:sticky sm:top-[81px] sm:mr-4 sm:overflow-y-hidden">
						<div className="w-full flex flex-col items-center justify-center border rounded-lg p-4">
							{!isAnswered ? (
								<CallDialogBtn classroomId={Number(classroomId)}
											   open={isCall}
											   onOpenChange={setIsCall}
											   sendJsonMessage={sendJsonMessage}/>
							) : (
								 <LiveKitRoom serverUrl="wss://learnflow-2d97d3r0.livekit.cloud"
											  token={lkToken!}
											  video={true}
											  audio={true}
											  className="flex flex-col w-full gap-3">
									 <MyVideoConference/>

									 <RoomAudioRenderer/>
									 <ControlBar onDisconnecting={() => {
										 setIsAnswered(false);
										 setIsCall(false);
									 }}/>
								 </LiveKitRoom>
							 )}
						</div>
					</div>
				) : null}
				{role === Roles.Student ? (
					!isAnswered ? (
						<CallDialogBtn classroomId={Number(classroomId)}
									   open={isCall}
									   onOpenChange={setIsCall}
									   sendJsonMessage={sendJsonMessage}
									   answer={handleCallAnswer}/>
					) : (
						<div>
							<LiveKitRoom serverUrl="wss://learnflow-2d97d3r0.livekit.cloud"
										 token={lkToken!}
										 video={true}
										 audio={true}>
								<MyVideoConference/>

								<RoomAudioRenderer/>
								<ControlBar onDisconnecting={() => setIsAnswered(false)}/>
							</LiveKitRoom>
						</div>
					)
				) : null}
			</div>
		</div>
	);
};

const MyVideoConference = () => {
	const tracks = useTracks(
		[
			{source: Track.Source.Camera, withPlaceholder: true},
			{source: Track.Source.ScreenShare, withPlaceholder: false},
		],
		{onlySubscribed: false},
	);

	//const track = useTrackByName(Track.Source.Camera)

	const teacherTracks = useMemo(
		() => tracks.filter((v) => v.participant.identity.includes("Учитель")),
		[tracks],
	);

	return (
		<div className="flex items-center justify-center">
			{teacherTracks.map((v) => (
				<ParticipantTile trackRef={v}/>
			))}
		</div>
	);
};

export default Lesson;