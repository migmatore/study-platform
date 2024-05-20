import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {Button} from "../ui/Button/Button.tsx";

const BackBtn = () => {
	const navigate = useNavigate();

	// return <button className="p-1 rounded-lg transition-all border hover:bg-gray-100 text-foreground
	// 							dark:bg-gray-800 dark:hover:bg-gray-900" onClick={() => navigate(-1)}>
	// 	<ArrowLeft size={20}/>
	// </button>;
	return <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
		<ArrowLeft size={20}/>
	</Button>;
};

export default BackBtn;