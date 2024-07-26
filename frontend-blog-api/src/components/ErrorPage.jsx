import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

const ErrorPage = () => (
	<div>
		<Navbar />
		<h1>Oh no, this route does not exist!</h1>
		<Link to="/">
			You can go back to the home page by clicking here, though!
		</Link>
	</div>
);

export default ErrorPage;
