import {useContext} from "react";
import {SidebarContext} from "../provider/SidebarProvider.tsx";

const useSidebar = () => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error("useSidebar must be used within a SidebarContext");
	}

	return context;
}

export default useSidebar;