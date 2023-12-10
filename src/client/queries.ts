import { gql } from "@apollo/client";

export const ALL_TODO = gql`
	query AllTodos {
		allTodos {
			id
			title
			completed
		}
	}
`;

export const ADD_TODO = gql`
	mutation AddTodo($title: String!, $completed: Boolean!) {
  newTodo: createTodo(title: $title, completed: $completed) {
    id
    title
    completed
  }
}
`;
export const GET_REPOSITORY = gql`
  query getRepository($username: String!, $repository: String!) {
    repository(name: $repository, owner: $username) {
      isFork
      isTemplate
      isArchived
      url
      forks {
        totalCount
      }
      stargazers {
        totalCount
      }
      name
      description
    }
  }
`;
export const GET_ISSUES = gql`
	query($userLogin: String!) {
  user(login: $userLogin) {
    repositories(affiliations: [OWNER], last: 10) {
      edges {
        node {
          issues(states: [OPEN], last: 10) {
            edges {
              node {
                createdAt
                title
                url
                repository {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`
export const CREATE_ISSUE = gql`
	mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
  createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
    issue {
      id
      title
      body
    }
  }
}
`;
