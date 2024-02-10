import {JSX, useContext} from "react";
import {SidebarContext} from "../Sidebar/SidebarContext.ts";
import {NavLink} from "react-router-dom";
import styles from "./SidebarItem.module.css"

interface SidebarItemProps {
	icon: JSX.Element;
	text: string;
	to: string,
	alert?: boolean;
}

const SidebarItem = ({icon, text, to}: SidebarItemProps) => {
	const {expanded} = useContext(SidebarContext)

	return (
		<NavLink to={to}
				 className={({isActive}) =>
					 isActive
					 ? `${styles.active} group`
					 : `${styles.default} group`}>
			{icon}
			<span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
				{text}
			</span>
			{/*{alert && (*/}
			{/*	<div className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${expanded ? "" : "top-2"}`}></div>*/}
			{/*)}*/}

			{!expanded && <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100
		        text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all
		        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
				{text}
            </div>}
		</NavLink>
	)
}

export default SidebarItem