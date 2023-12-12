
export interface Issue {
	id?: string;
	title?: string;
	repository?: {
		id?: string;
	};
	body?: string;
	createdAt?: string;
}

export interface RepositoryData {
	name: string;
	id: string;
	issues: {
		nodes: Issue[];
	};
}

export interface Data {
	data: {
		id: string
		body: string
		title: string
		repository: RepositoryData;
	};
}
