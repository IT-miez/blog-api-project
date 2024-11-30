import "./styles/App.css";
import Navbar from "./components/Navbar";

import PostsList from "./components/PostsList";

// Testing imports

function App() {
	return (
		<>
			<div>
				<Navbar />
			</div>
			<PostsList />
		</>
	);
}

export default App;
