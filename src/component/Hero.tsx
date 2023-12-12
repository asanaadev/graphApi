import { Route, Routes } from "react-router-dom"
import ContentList from "./ContentList"
import Login from "./Login"
import { useQuery } from "@apollo/client"
import { GET_ALL_REPOSITORY } from "../client/queries"
import { client } from "../client/client"
import { Spin } from "antd"
import Modify from "./Modify"

// interface IData {
// 	user: {
// 		repositories: {
// 			edges: [
// 				{
// 					node: {
// 						name: string
// 						id: string
// 						issues: {
// 							edges:
// 						}
// 					}
// 				}
// 			]
// 		}
// 	}
// }



const Hero = () => {
	const ownerName = "Zhumabai00"
	const { loading: MainLoading, error: MainError, data } = useQuery(GET_ALL_REPOSITORY, {
		client,
		variables: {
			userLogin: ownerName,
		},
	});
	if (MainLoading) return <Spin tip="Loading" size="large"><div className="content" /></Spin>

	return (
		<Routes>
			<Route path="/" element={<ContentList data={data} />} />
			<Route path="/:title" element={<Modify ownerName={ownerName} />} />
		</Routes>
	)
}

export default Hero
