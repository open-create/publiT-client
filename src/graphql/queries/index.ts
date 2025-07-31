import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      id
      title
      content
      author {
        id
        username
        avatar
      }
      likes
      comments
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author {
        id
        username
        avatar
        bio
      }
      likes
      comments
      createdAt
      updatedAt
    }
  }
`;

export const GET_NOTICES = gql`
  query GetNotices {
    notices {
      id
      title
      content
      status
      createdAt
    }
  }
`;

export const GET_INQUIRIES = gql`
  query GetInquiries {
    inquiries {
      id
      title
      content
      status
      user {
        id
        username
        email
      }
      answer
      createdAt
    }
  }
`;

export const GET_REPORTS = gql`
  query GetReports {
    reports {
      id
      type
      reason
      status
      reporter {
        id
        username
      }
      targetPost {
        id
        title
      }
      createdAt
    }
  }
`;
