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
