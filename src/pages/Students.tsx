import useAuth from "../hooks/useAuth.tsx";
import {Roles} from "../types/roles.ts";
import CreateStudentDialogBtn from "../components/CreateStudentDialogBtn/CreateStudentDialogBtn.tsx";
import StudentItem from "../components/StudentItem/StudentItem.tsx";
import useStudents from "../hooks/useStudents.tsx";
import {ImSpinner2} from "react-icons/im";
import {Menu} from "lucide-react";
import {Button} from "../components/ui/Button/Button.tsx";
import useSidebar from "../hooks/useSidebar.tsx";

const Students = () => {
	const {role} = useAuth();
	const {toggleMobileExpanded} = useSidebar();
	const {students, isLoading, fetchError} = useStudents();

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<div className="flex gap-4 items-center">
					<Button className="sm:hidden" variant="outline" size="icon" onClick={toggleMobileExpanded}>
						<Menu size={20}/>
					</Button>
					<h1 className="text-2xl text-foreground">Список учеников</h1>
				</div>
				<p className="text-muted-foreground">Количество: {students.length ?? 0}</p>
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
							  {role === Roles.Teacher ? <CreateStudentDialogBtn/> : null}
							  {students.map(student =>
								  <StudentItem key={student.id}
											   id={student.id}
											   fullName={student.fullName}
											   email={student.email}
											   classroomsId={student.classroomsId}/>)}
						  </>
					  )}
				 </>
				}
			</div>
		</div>
	);
};

export default Students;