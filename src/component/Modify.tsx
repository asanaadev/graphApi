import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_ISSUES } from '../client/queries';
import { CREATE_ISSUE } from '../client/queries';
import { client } from '../client/client';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModifyContent from './ModifyContent';
import CreateContent from './CreateContent';
interface Name {
	ownerName?: string
}

const Modify: FC<Name> = ({ ownerName }) => {
	const { title } = useParams()
	const { data, loading, error } = useQuery(GET_ISSUES, {
		client,
		variables: {
			owner: ownerName,
			name: title,
			first: 50
		},
	});


	if (loading) return <h1>Loading...</h1>
	if (error) return <h1>Error...</h1>



	// const handlekey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
	// 	if (e.key === "Enter") handleSubmit(e);
	// }


	return (
		<div>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div className="mb-32 mt-2 gap-2 grid text-center md:max-w-5xl lg:w-full md:mb-0 lg:grid-cols-4 lg:text-left">
					<CreateContent data={data.repository} />
					{data.repository.issues.nodes.map((item: any) => (
						<ModifyContent key={item.id} item={item} />
					))}
				</div>
			</main >
			<h1>{data.repository.name}</h1>
		</div>
	)
}

export default Modify
