import AuthProvider from "./provider/AuthProvider.tsx";
import Routes from "./routes";
import DesignerProvider from "./provider/DesignerProvider.tsx";
import {ThemeProvider} from "./provider/ThemeProvider.tsx";

const App = () => {
	return (
		<main className="flex">
			<ThemeProvider>
				<AuthProvider>
					<DesignerProvider>
						<Routes/>
					</DesignerProvider>
				</AuthProvider>
			</ThemeProvider>
		</main>
	)
}

export default App;
