import Designer from "../components/Designer/Designer.tsx";
import {useParams} from "react-router-dom";
import {DndContext, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import DragOverlayWrapper from "../components/DragOverlayWrapper/DragOverlayWrapper.tsx";
import PreviewDialogBtn from "../components/PreviewDialogBtn/PreviewDialogBtn.tsx";
import SaveLessonBtn from "../components/SaveLessonBtn/SaveLessonBtn.tsx";
import BackBtn from "../components/BackBtn/BackBtn.tsx";
import DesignerProvider from "../provider/DesignerProvider.tsx";
import DesignerSidebar from "../components/DesignerSidebar/DesignerSidebar.tsx";
import {useEffect, useRef, useState} from "react";
import {AxiosError} from "axios";
import LessonService from "../services/lesson.service.ts";
import {ILessonsResp} from "../types/lesson.ts";
import {ImSpinner2} from "react-icons/im";
import {isMobile} from "react-device-detect";

type Params = {
	lessonId: string;
	classroomId: string;
}

const EditLesson = () => {
	const {lessonId, classroomId} = useParams<Params>();

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 5,
		},
	});
	const sensors = useSensors(mouseSensor);

	const [lesson, setLesson] = useState<ILessonsResp | null>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getLesson = async () => {
			if (lessonId !== undefined) {
				try {
					const resp = await LessonService.getLesson(lessonId);

					if (resp && resp.status === 200) {
						setIsLoading(false);
						setLesson(resp.data);
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
	}, [lessonId]);

	return (
		<DesignerProvider lessonContent={lesson?.content}>
			<DndContext sensors={sensors}>
				<div className="w-full h-full flex flex-col">
					<div className="flex p-4 border-b items-center gap-4 bg-background sm:sticky sm:top-0 sm:z-50">
						<div className="w-full flex flex-col gap-2 sm:gap-0">
							<div className="flex gap-4">
								<BackBtn/>
								<h1 className="text-2xl">Конструктор уроков</h1>
							</div>
							<div className="flex justify-between items-center">
								<p className="text-muted-foreground">Урок: {lesson?.title}</p>
								<div className="flex gap-2">
									{!isLoading && !fetchError && !isMobile ? (
										<>
											<PreviewDialogBtn/>
											<SaveLessonBtn lessonId={lessonId!} classroomId={classroomId!}/>
										</>) : null}
								</div>
							</div>
						</div>
					</div>
					{isMobile ? (
						<div className="w-full h-full flex flex-col items-center justify-center p-4 gap-2">
							<h1 className="text-3xl">Упс :(</h1>
							<h1 className="text-xl">Конструктор уроков, к сожалению, пока что не поддерживается на
								мобильных устройствах. Пожалуйста, зайдите на сайт с планшета или ПК</h1>
						</div>
					) : (
						 <div className="flex w-full">
							 {isLoading ? (
								 <div className="w-full h-screen flex justify-center items-center">
									 <ImSpinner2 className="text-muted-foreground w-8 h-8 animate-spin"/>
								 </div>
							 ) : (
								  <>
									  {fetchError ? (
										  <div className="flex m-4 flex-col w-full bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
											  <h3 className="text-lg">Ошибка</h3>
											  <p>{fetchError}</p>
										  </div>
									  ) : (
										   <>
											   <div className="w-full">
												   <div className="w-full h-full flex flex-col flex-grow items-center justify-center
										 	bg-background overflow-y-auto bg-[url(/graph-paper.svg)]
										 	dark:bg-[url(/graph-paper-dark.svg)]">
													   <Designer/>
												   </div>
											   </div>
											   <div className="h-[calc(100vh-101px)] w-[400px] sticky top-[101px] overflow-y-scroll">
												   <DesignerSidebar/>
											   </div>
										   </>
									   )}
								  </>
							  )}
						 </div>
					 )}
				</div>
				<DragOverlayWrapper/>
			</DndContext>
		</DesignerProvider>
	);
};

export default EditLesson;