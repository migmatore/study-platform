import {cn} from "../../utils";
import useSidebar from "../../hooks/useSidebar.tsx";

const SidebarBackground = () => {
	const {mobileExpanded, toggleMobileExpanded} = useSidebar();
	return (
		<div className={cn(
			"absolute w-full h-full bg-gray-600 opacity-50 dark:bg-gray-900 dark:opacity-85",
			{"hidden": !mobileExpanded},
		)} onClick={() => toggleMobileExpanded()}></div>
	);
};

export default SidebarBackground;