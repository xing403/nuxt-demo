import postModel from '~/server/database/modules/PostEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'
import { Post } from '~/types/post'


export default defineEventHandler(async (event) => {
  const post = await readBody<Post>(event)
  const self = await getLoginUser(event)
  if (!self || !self.user)
    throw createError({ statusCode: 401, message: '请先登录' })
  console.log("post.postId", post)
  const dbPost = await postModel.findOne({ where: { postId: post.postId, createBy: self.info.username, isDelete: '0' } })

  if (!dbPost)
    throw createError({ statusCode: 404, message: '文章不存在' })
  const result = await postModel.update({
    postTitle: post.postTitle,
    postContent: post.postContent,
    postTags: post.postTags,
    postCover: post.postCover,
    postIsTop: post.postIsTop,
    postCategory: post.postCategory,
    updateBy: self.info.username,
  }, { where: { postId: dbPost.postId } })
  if (result[0] === 0)
    throw createError({ statusCode: 500, message: '更新失败' })
  return {
    code: 200,
    message: '更新成功'
  }
})
