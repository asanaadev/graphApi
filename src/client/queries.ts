import { gql } from "@apollo/client";

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

export const GET_ALL_REPOSITORY = gql`
  query($userLogin: String!) {
  user(login: $userLogin) {
    name
    avatarUrl
    projectsUrl
    url
    repositories(affiliations: [OWNER], last: 100) {
      edges {
        node {
          name
					id
          issues(states: [OPEN], last: 100) {
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
`;
export const GET_ISSUES = gql`
  query GetIssuesForRepository($owner: String!, $name: String!, $first: Int!) {
    repository(owner: $owner, name: $name) {
      name
      id
      issues(first: $first) {
        nodes {
          id
          title
          body
          createdAt
          repository {
            id
          }
        }
      }
    }
  }
`;
// export const GET_ISSUES2 = gql`
// 	query($userLogin: String!) {
//   user(login: $userLogin) {
//     repositories(affiliations: [OWNER], last: 10) {
//       edges {
//         node {
// 					name
//           id
//           issues(states: [OPEN], last: 10) {
//             edges {
//               node {
//                 createdAt
//                 title
//                 url
//                 repository {
//                   name
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `
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
export const UPDATE_ISSUE = gql`
  mutation UpdateIssue($issueId: ID!, $title: String!, $body: String!) {
    updateIssue(input: { id: $issueId, title: $title, body: $body }) {
      issue {
        id
        title
        body
      }
    }
  }
`;

