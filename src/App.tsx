import AuthProvider from "./provider/AuthProvider.tsx";
import Routes from "./routes";
import DesignerProvider from "./provider/DesignerProvider.tsx";

const App = () => {
	//const [logged, setLogged] = useState(false)

	return (
		// <div>
		// 	{logged ? (
		// 		<Routes>
		// 			<Route path="/" element={<div>test</div>}/>
		// 		</Routes>
		// 	) : (
		// 		<main className="flex">
		// 			<Routes>
		// 				<Route path="/signin" element={<Login/>}/>
		// 				<Route path="/signup" element={<Signup/>}/>
		//
		// 				<Route element={<SidebarLayout/>}>
		// 					<Route index element={<Home/>}/>
		// 				</Route>
		//
		// 			</Routes>
		// 		</main>
		// 	)}
		//
		// </div>
		<main className="flex">
			<AuthProvider>
				<DesignerProvider>
					<Routes/>
				</DesignerProvider>
			</AuthProvider>
		</main>
	)
}

export default App;
