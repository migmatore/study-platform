import ClassroomItem from "../components/ClassroomItem/ClassroomItem.tsx";
import CreateClassroomDialogBtn from "../components/CreateClassroomDialogBtn/CreateClassroomDialogBtn.tsx";
import useAuth from "../hooks/useAuth.tsx";
import {Roles} from "../types/roles.ts";
import useClassrooms from "../hooks/useClassrooms.tsx";

const Classrooms = () => {
	const {role} = useAuth();
	//const [classrooms, setClassrooms] = useState<IClassroomResp[]>();
	//
	// useEffect(() => {
	// 	const getClassrooms = async () => {
	// 		try {
	// 			const resp = await classroomService.getClassrooms();
	// 			console.log(resp.data);
	// 			if (!ignore) {
	// 				setClassrooms(resp.data);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	//
	// 	let ignore = false;
	//
	// 	getClassrooms().catch(console.error);
	//
	// 	return () => {
	// 		ignore = true;
	// 	};
	// }, []);
	const {classrooms} = useClassrooms();

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<h1 className="text-2xl text-foreground">Список классов</h1>
				<p className="text-muted-foreground">Количество: {classrooms?.length ?? 0}</p>
			</div>
			<div className="flex flex-col space-y-4">
				{role === Roles.Teacher ? <CreateClassroomDialogBtn/> : null}
				{classrooms?.map(classroom =>
					<ClassroomItem key={classroom.id}
								   id={classroom.id}
								   title={classroom.title}
								   description={classroom.description}/>)}
			</div>
		</div>
	);
};

export default Classrooms;