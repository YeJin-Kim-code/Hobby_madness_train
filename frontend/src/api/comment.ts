import api from "./client";

// ========================================
// 댓글 작성자
// ========================================

export interface CommentUser {
  id: number;
  email: string;
  nickname: string;
}

// ========================================
// 댓글
// ========================================

export interface Comment {
  id: number;

  content: string;

  createdAt: string;
  updatedAt: string;

  user: CommentUser;
}

// ========================================
// API 응답
// ========================================

interface CommentListResponse {
  message: string;
  data: Comment[];
}

interface CommentResponse {
  message: string;
  data: Comment;
}

// ========================================
// 댓글 목록 조회
// GET /posts/:postId/comments
// ========================================

export const getComments = async (
  postId: number,
): Promise<Comment[]> => {
  const response =
    await api.get<CommentListResponse>(
      `/posts/${postId}/comments`,
    );

  return response.data.data;
};

// ========================================
// 댓글 작성
// POST /posts/:postId/comments
// ========================================

export const createComment = async (
  postId: number,
  content: string,
): Promise<Comment> => {
  const response =
    await api.post<CommentResponse>(
      `/posts/${postId}/comments`,
      {
        content,
      },
    );

  return response.data.data;
};

// ========================================
// 댓글 수정
// PATCH /comments/:id
// ========================================

export const updateComment = async (
  commentId: number,
  content: string,
): Promise<Comment> => {
  const response =
    await api.patch<CommentResponse>(
      `/comments/${commentId}`,
      {
        content,
      },
    );

  return response.data.data;
};

// ========================================
// 댓글 삭제
// DELETE /comments/:id
// ========================================

export const deleteComment = async (
  commentId: number,
): Promise<void> => {
  await api.delete(
    `/comments/${commentId}`,
  );
};