export interface Post {
  postId: number;
  postTitle: string;
  postContent: string;
  postTags: string;
  isDelete: string;
  createBy: string;
  updateBy: string;
  createTime?: string;
  updateTime?: string;
}
