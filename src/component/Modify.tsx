import { useQuery } from '@apollo/client';
import { GET_ISSUES } from '../client/queries';
import { client } from '../client/client';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModifyContent from './ModifyContent';
import CreateContent from './CreateContent';
import { User } from '../models/models';
import { Spin } from 'antd';

interface Name {
	ownerName?: string
	user: User
}

const Modify: FC<Name> = ({ ownerName, user }) => {
	const { title } = useParams()
	const { data, loading, error } = useQuery(GET_ISSUES, {
		client,
		variables: {
			owner: ownerName,
			name: title,
			first: 50
		},
	});


	if (loading) return <Spin tip="Loading" className='mt-12' size="large"><div className="content" /></Spin>
	if (error) return <Spin tip="Error" className='mt-12' size="large"><div className="content" /></Spin>



	// const handlekey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
	// 	if (e.key === "Enter") handleSubmit(e);
	// }


	return (
		<div>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
					<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
						Get started by editing&nbsp;
						<code className="font-mono font-bold">{data.repository.name}</code>
					</p>
					<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
						<a
							className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
							href={user.projectsUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							By{' '}
							<img
								src={user.avatarUrl}
								alt="avatar"
								className="rounded-full"
								width={100}
								height={24}
							/>
						</a>
					</div>
				</div>
				<div className="w-full flex flex-wrap gap-5">
					<Link to='/' className='flex-1 m-0'>
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							&lt;-
						</span>{' '}
						Home
					</Link>
					<h2 className='opacity-70'>can find ur issues and create, update and remove</h2>
				</div>
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
