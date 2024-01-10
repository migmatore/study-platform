import {JSX, useContext} from "react";
import {SidebarContext} from "../sidebar/SidebarContext.ts";

interface SidebarItemProps {
	icon: JSX.Element;
	text: string;
	active?: boolean;
	alert?: boolean;
}

function SidebarItem({icon, text, active, alert}: SidebarItemProps) {
	const {expanded} = useContext(SidebarContext)

	return (
		<li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer 
                transition-colors  group
                ${active
			? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
			: "hover:bg-indigo-50 text-gray-600"
		}
            `}>
			{icon}
			<span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
			{alert && (
				<div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
			)}

			{!expanded && <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 
                text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all 
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
				{text}
            </div>}
		</li>
	)
}

export default SidebarItem