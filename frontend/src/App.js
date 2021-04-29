import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Welcome to Reddit</h1>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</div>
	);
}

export default App;
