import { Route, Routes } from "react-router-dom"
import ContentList from "./ContentList"
import Modify from "./Modify"


const Hero = () => {

	return (
		<Routes>
			{/* <div className=""> */}
			<Route path="" element={<ContentList />} />
			<Route path="/modify" element={<Modify />} />
			{/* </div> */}
		</Routes>
	)
}

export default Hero
