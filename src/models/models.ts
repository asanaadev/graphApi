export interface Issue {
	node: {
		createdAt: string;
		title: string;
		url: string;
		repository: {
			name: string;
		};
	};
}

export interface Repository {
	node: {
		name: string;
		id: string;
		issues: {
			edges: Issue[];
		};
	};
}

export interface User {
	name: string
	url: string
	avatarUrl: string
	repositories: {
		edges: Repository[];
	};
}

export interface Data {
	data: {
		user: User;
	};
}
