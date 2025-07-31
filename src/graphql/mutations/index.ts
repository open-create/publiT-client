import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      author {
        id
        username
      }
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const CREATE_NOTICE = gql`
  mutation CreateNotice($input: CreateNoticeInput!) {
    createNotice(input: $input) {
      id
      title
      content
      status
      createdAt
    }
  }
`;

export const UPDATE_NOTICE = gql`
  mutation UpdateNotice($id: ID!, $input: UpdateNoticeInput!) {
    updateNotice(id: $id, input: $input) {
      id
      title
      content
      status
      updatedAt
    }
  }
`;

export const ANSWER_INQUIRY = gql`
  mutation AnswerInquiry($id: ID!, $answer: String!) {
    answerInquiry(id: $id, answer: $answer) {
      id
      answer
      status
      updatedAt
    }
  }
`;

export const UPDATE_REPORT_STATUS = gql`
  mutation UpdateReportStatus($id: ID!, $status: ReportStatus!) {
    updateReportStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;
