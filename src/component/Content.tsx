import { FC } from "react"
import { Issue } from "../models/ICreateContent"

const Content: FC<any> = ({ item }) => {

	return (
		<a
			href={item.node.name}
			className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
			// target="_blank"
			rel="noopener noreferrer"
		>
			<h2 className={`mb-1 text-2xl font-semibold`}>
				{item.node.name}
			</h2>
			<div className="m-0 max-w-[30ch]">
				<h3 className=''>Issues{' '}
					<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
						-&gt;
					</span>
				</h3>
				<div className={`text-sm opacity-50`}>
					{!item.node.issues.edges[0] ? <h1 className=''>There is no issues yet:(</h1> :
						item.node.issues.edges.map((item: any) => <p key={item.node.title}>{item.node.title}</p>)
					}
				</div>
			</div>

			{/* {item.node.issues.edges[0].node.title ? item.node.issues.edges[0].node.title : "non issues"} */}
			{/* Find in-depth information about Next.js features and API. */}
			{/* {item.node.issues ? item.node.issues.edges[0].node.createdAt : 'd'} */}

		</a>
	)
}

export default Content
