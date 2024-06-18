import {ImSpinner2} from "react-icons/im";
import {Menu} from "lucide-react";
import {Button} from "../components/ui/Button/Button.tsx";
import useSidebar from "../hooks/useSidebar.tsx";
import useTeachers from "../hooks/useTeachers.tsx";
import CreateTeacherDialogBtn from "../components/CreateTeacherDialogBtn/CreateTeacherDialogBtn.tsx";
import TeacherItem from "../components/TeacherItem/TeacherItem.tsx";

const Students = () => {
	//const {role} = useAuth();
	const {toggleMobileExpanded} = useSidebar();
	const {teachers, isLoading, fetchError} = useTeachers();

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<div className="flex gap-4 items-center">
					<Button className="sm:hidden" variant="outline" size="icon" onClick={toggleMobileExpanded}>
						<Menu size={20}/>
					</Button>
					<h1 className="text-2xl text-foreground">Список преподавателей</h1>
				</div>
				<p className="text-muted-foreground">Количество: {teachers.length ?? 0}</p>
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
							  <CreateTeacherDialogBtn/>
							  {teachers.map(teacher =>
								  <TeacherItem key={teacher.id}
											   id={teacher.id}
											   fullName={teacher.fullName}
											   email={teacher.email}/>)}
						  </>
					  )}
				 </>
				}
			</div>
		</div>
	);
};

export default Students;