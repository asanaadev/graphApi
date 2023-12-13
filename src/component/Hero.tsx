import { Route, Routes } from "react-router-dom"
import ContentList from "./ContentList"
import { useQuery } from "@apollo/client"
import { GET_ALL_REPOSITORY } from "../client/queries"
import { client } from "../client/client"
import { Spin } from "antd"
import Modify from "./Modify"

const Hero = () => {
	const ownerName = "Zhumabai00"
	const { loading: MainLoading, error: MainError, data } = useQuery(GET_ALL_REPOSITORY, {
		client,
		variables: {
			userLogin: ownerName,
		},
	});
	if (MainLoading) return <Spin tip="Loading" className='mt-12' size="large"><div className="content" /></Spin>
	if (MainError) return <Spin tip="Error" className='mt-12' size="large"><div className="content" /></Spin>

	return (
		<Routes>
			<Route path="/" element={<ContentList data={data} />} />
			<Route path="/:title" element={<Modify user={data.user} ownerName={ownerName} />} />
		</Routes>
	)
}

export default Hero
