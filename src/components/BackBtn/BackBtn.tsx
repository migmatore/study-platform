import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

const BackBtn = () => {
	const navigate = useNavigate();

	return <button className="p-1 rounded-lg transition-all border hover:bg-gray-100 text-foreground
								dark:bg-gray-800 dark:hover:bg-gray-900" onClick={() => navigate(-1)}>
		<ArrowLeft size={20}/>
	</button>;
};

export default BackBtn;