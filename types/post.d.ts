export interface Post {
  postId: number;
  postTitle: string;
  postContent: string;
  postTags: string;
  postViewer: number;
  postComment: number;
  postCollect: number;
  postStar: number;
  postCover: string;
  postIsTop: string;
  isDelete: string;
  createBy: string;
  updateBy: string;
  createTime?: string;
  updateTime?: string;
}
