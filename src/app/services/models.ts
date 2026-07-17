export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateUserResponse {
  email: string;
  name: string;
}

export interface PagedResult<T> {
  data: T[];
  totalElements: number;
  currentPageNo: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type PostsResponse = PagedResult<PostUserView>;

export type CommentsResponse = PagedResult<Comment>;

export interface PostUserView {
  id: number;
  title: string;
  slug: string;
  content: string;
  categorySlug?: string;
  categoryName?: string;
  authorId: number;
  authorName: string;
  createdAt: Date;
  comments: Comment[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: Date;
}

export interface CreatePostPayload {
  title: string;
  slug: string;
  content: string;
  categorySlug?: string;
}

export interface UpdatePostPayload {
  title: string;
  slug: string;
  content: string;
  categorySlug?: string;
}

export interface CreateCommentPayload {
  name: string;
  email: string;
  content: string;
}
