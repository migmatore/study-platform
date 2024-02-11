import {ArrowLeft, ArrowRight, LogOut, Moon, Sun} from "lucide-react";
import {PropsWithChildren, useState} from "react";
import {SidebarContext} from "./SidebarContext.ts";
import styles from './Sidebar.module.css';
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../provider/ThemeProvider.tsx";

const Sidebar = ({children}: PropsWithChildren) => {
	const navigate = useNavigate()
	const [expanded, setExpanded] = useState(true)
	const {theme, setTheme} = useTheme();

	const handleLogout = () => {
		navigate("/logout", {replace: true})
	}

	return (
		<aside className="h-screen sticky left-0 top-0">
			<nav className="h-full flex flex-col bg-background border-r shadow-sm sticky">
				<div className="p-4 pb-2 flex justify-between items-center">
					<img src="https://img.logoipsum.com/297.svg"
						 className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt=""/>
					<button onClick={() => setExpanded(curr => !curr)}
							className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600">
						{expanded ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}
					</button>
				</div>

				<SidebarContext.Provider value={{expanded}}>
					<ul className="flex-1 px-3">{children}</ul>
				</SidebarContext.Provider>

				{/*<div className="px-3">*/}
				{/*	<div className="w-full relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer*/}
				{/*			transition-all hover:bg-blue-50 group">*/}
				{/*		{theme === 'light' ? (*/}
				{/*			<div className="flex flex-row justify-center items-center"*/}
				{/*					onClick={() => setTheme('dark')}>*/}
				{/*				<Moon size={20}/>*/}
				{/*				<p*/}
				{/*					className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>*/}
				{/*					Темная тема*/}
				{/*				</p>*/}
				{/*			</div>*/}
				{/*		) : (*/}
				{/*			<div className="flex flex-row justify-center items-center"*/}
				{/*					onClick={() => setTheme('light')}>*/}
				{/*				<Sun size={20}/>*/}
				{/*				<p*/}
				{/*					className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>*/}
				{/*					Светлая тема*/}
				{/*				</p>*/}
				{/*			</div>*/}
				{/*		)}*/}
				{/*		{!expanded &&*/}
                {/*            <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 */}
				{/*				text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible */}
				{/*				group-hover:opacity-100 group-hover:translate-x-0`}>*/}
                {/*                Тема*/}
                {/*            </div>*/}
				{/*		}*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className="border-t flex p-3 mt-2">
					<img src="https://ui-avatars.com/api/?background=60a5fa&color=eff6ff&bold=true"
						 className="w-10 h-10 rounded-md" alt=""/>
					<div
						className={`flex justify-between items-center overflow-hidden transition-all 
                            ${expanded ? "w-52 ml-3" : "w-0"}`}>
						<div className="leading-4">
							<h4 className="font-semibold">John Doe</h4>
							<span className="text-xs text-gray-600">johndoe@gmail.com</span>
						</div>
						<div className={styles.logout} onClick={handleLogout}>
							<LogOut size={20}/>
						</div>
					</div>
				</div>
			</nav>
		</aside>
	)
}

export default Sidebar