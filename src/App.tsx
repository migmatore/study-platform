import AuthProvider from "./provider/AuthProvider.tsx";
import Routes from "./routes";
import {ThemeProvider} from "./provider/ThemeProvider.tsx";

const App = () => {
	return (
		<main className="flex">
			<ThemeProvider>
				<AuthProvider>
					<Routes/>
				</AuthProvider>
			</ThemeProvider>
		</main>
	);
};

export default App;
