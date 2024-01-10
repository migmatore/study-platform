import AuthProvider from "./provider/AuthProvider.tsx";
import Routes from "./routes";


function App() {
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
				<Routes/>
			</AuthProvider>
		</main>
	)
}

export default App;
