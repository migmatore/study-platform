import apiClient from "../api.ts";

const Home = () => {
	const handleClick = async () => {
		const resp = await apiClient.get("/classrooms")
		console.log(resp)
	}

	return (<div className="flex flex-row flex-wrap px-6 py-8 mx-auto h-full lg:py-0" onClick={handleClick}>home</div>)
}

export default Home