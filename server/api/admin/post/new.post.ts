import postModel from '~/server/database/modules/PostEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'
import { Post } from '~/types/post'


export default defineEventHandler(async (event) => {
  const post = await readBody<Post>(event)
  const self = await getLoginUser(event)

  if (!self || !self.user)
    throw createError({ statusCode: 401, message: '请先登录' })

  const result = await postModel.create({
    postTitle: post.postTitle == '' ? '无标题' : post.postTitle,
    postContent: post.postContent,
    postTags: post.postTags,
    postCategory: post.postCategory,
    postIsTop: post.postIsTop,
    postCover: post.postCover,
    createBy: self.info.username,
    updateBy: self.info.username,
  })
  if (!result)
    throw createError({ statusCode: 500, message: '更新失败' })
  return {
    code: 200,
    message: '更新成功'
  }
})
