import { Link } from "react-router-dom"

function Home() {
	if(localStorage.getItem("version")){
		localStorage.setItem("version","v1")
		localStorage.removeItem("categories")
		localStorage.removeItem("locations")
	}
	return (
		<div className="flex items-center  justify-center  h-screen text-lg font-medium">
			<div className="flex self-center flex-col text-center align-middle"><h1>Welcome to myLocations!</h1>
			<p>Start by managing either your categories</p>
			<p>or</p>
			<p>your locations</p></div>
		</div>
	)
}

export default Home 