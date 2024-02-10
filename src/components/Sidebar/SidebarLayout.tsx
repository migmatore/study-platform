import Sidebar from "./Sidebar.tsx";
import {Outlet} from "react-router-dom";
import {Hotel, UserCircle, Users} from "lucide-react";
import {JSX} from "react";
import {PiUsersThreeBold} from "react-icons/pi";
import {FaUsersRectangle} from "react-icons/fa6";
import {IconContext} from "react-icons";
import {Roles} from "../../types/roles.ts";
import SidebarItem from "../SidebarItem/SidebarItem.tsx";
import useAuth from "../../hooks/useAuth.tsx";

interface ISidebarItemProp {
	to: string;
	icon: JSX.Element;
	text: string;
}

const adminItems: ISidebarItemProp[] = [
	{
		to: "/profile",
		icon: <UserCircle size={22}/>,
		text: "Профиль",
	},
	{
		to: "/institution",
		icon: <Hotel size={22}/>,
		text: "Учебное заведение",
	},
	{
		to: "/teachers",
		icon: <Users size={22}/>,
		text: "Учителя",
	},
	{
		to: "/classrooms",
		icon: <IconContext.Provider value={{size: "22px"}}><FaUsersRectangle/></IconContext.Provider>,
		text: "Классы",
	},
	{
		to: "/students",
		icon: <IconContext.Provider value={{size: "22px"}}><PiUsersThreeBold/></IconContext.Provider>,
		text: "Ученики",
	},
]

const teacherItems: ISidebarItemProp[] = [
	{
		to: "/profile",
		icon: <UserCircle size={22}/>,
		text: "Профиль",
	},
	{
		to: "/classrooms",
		icon: <IconContext.Provider value={{size: "22px"}}><FaUsersRectangle/></IconContext.Provider>,
		text: "Классы",
	},
	{
		to: "/students",
		icon: <IconContext.Provider value={{size: "22px"}}><PiUsersThreeBold/></IconContext.Provider>,
		text: "Ученики",
	},
]

const studentItems: ISidebarItemProp[] = [
	{
		to: "/profile",
		icon: <UserCircle size={22}/>,
		text: "Профиль",
	},
	{
		to: "/classrooms",
		icon: <IconContext.Provider value={{size: "22px"}}><FaUsersRectangle/></IconContext.Provider>,
		text: "Классы",
	},
]

interface ISidebarItems {
	role: Roles;
	items: ISidebarItemProp[];
}

const sidebarItems: ISidebarItems[] = [
	{
		role: Roles.Admin,
		items: adminItems,
	},
	{
		role: Roles.Teacher,
		items: teacherItems,
	},
	{
		role: Roles.Student,
		items: studentItems,
	},
]

const SidebarLayout = () => {
	const {role} = useAuth();

	return (
		<>
			<Sidebar>
				{sidebarItems.filter((item) => item.role == role).map((item) =>
					item.items.map((roleItem, i) =>
						<SidebarItem key={i} to={roleItem.to} icon={roleItem.icon} text={roleItem.text}/>))}
				{/*{sidebarItems.map((item) =>*/}
				{/*	item.role == role && item.items.map((roleItems) =>*/}
				{/*		<SidebarItem key={roleItems.to}*/}
				{/*					 to={roleItems.to}*/}
				{/*					 icon={roleItems.icon}*/}
				{/*					 text={roleItems.text}/>*/}
				{/*	))}*/}
			</Sidebar>
			<Outlet/>
		</>
	)
}

export default SidebarLayout