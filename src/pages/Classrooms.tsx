import ClassroomItem from "../components/ClassroomItem/ClassroomItem.tsx";
import CreateClassroomDialogBtn from "../components/CreateClassroomDialogBtn/CreateClassroomDialogBtn.tsx";
import useAuth from "../hooks/useAuth.tsx";
import {Roles} from "../types/roles.ts";
import useClassrooms from "../hooks/useClassrooms.tsx";
import {ImSpinner2} from "react-icons/im";
import {Menu} from "lucide-react";
import {Button} from "../components/ui/Button/Button.tsx";
import useSidebar from "../hooks/useSidebar.tsx";

const Classrooms = () => {
	const {role} = useAuth();
	const {toggleMobileExpanded} = useSidebar();
	const {classrooms, isLoading, fetchError} = useClassrooms();

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<div className="flex gap-4 items-center">
					<Button className="sm:hidden" variant="outline" size="icon" onClick={toggleMobileExpanded}>
						<Menu size={20}/>
					</Button>
					<h1 className="text-2xl text-foreground">Список классов</h1>
				</div>
				<p className="text-muted-foreground">Количество: {classrooms.length ?? 0}</p>
			</div>
			<div className="flex flex-col space-y-4">
				{isLoading ? (
					<div className="w-full h-full flex justify-center items-center">
						<ImSpinner2 className="text-muted-foreground w-8 h-8 animate-spin"/>
					</div>
				) : <>
					 {fetchError ? (
						 <div className="flex flex-col w-full bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
							 <h3 className="text-lg">Ошибка</h3>
							 <p>{fetchError}</p>
						 </div>
					 ) : (
						  <>
							  {role === Roles.Teacher ? <CreateClassroomDialogBtn/> : null}
							  {classrooms?.map(classroom =>
								  <ClassroomItem key={classroom.id}
												 id={classroom.id}
												 title={classroom.title}
												 description={classroom.description}/>)}
						  </>
					  )}
				 </>
				}
			</div>
		</div>
	);
};

export default Classrooms;