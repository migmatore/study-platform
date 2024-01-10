import Sidebar from "./Sidebar.tsx";
import {Outlet} from "react-router-dom";
import SidebarItem from "../sidebarItem/SidebarItem.tsx";
import {BarChart, Boxes, LayoutDashboardIcon, LifeBuoy, Package, Receipt, Settings, UserCircle} from "lucide-react";

function SidebarLayout() {
	return (
		<>
			<Sidebar>
				<SidebarItem icon={<LayoutDashboardIcon size={20}/>} text="Dasboard" alert/>
				<SidebarItem icon={<BarChart size={20}/>} text="Statistics" active/>
				<SidebarItem icon={<UserCircle size={20}/>} text="Users"/>
				<SidebarItem icon={<Boxes size={20}/>} text="Inventory"/>
				<SidebarItem icon={<Package size={20}/>} text="Orders" alert/>
				<SidebarItem icon={<Receipt size={20}/>} text="Billings"/>
				<hr className="my-3"/>
				<SidebarItem icon={<Settings size={20}/>} text="Settings"/>
				<SidebarItem icon={<LifeBuoy size={20}/>} text="Help"/>
			</Sidebar>
			<Outlet/>
		</>
	)
}

export default SidebarLayout