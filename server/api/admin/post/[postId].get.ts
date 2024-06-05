import postModel from '~/server/database/modules/PostEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'

export default defineEventHandler(async (event) => {
  const { postId } = event.context.params as { postId: string }
  const { user } = await getLoginUser(event)
  if (!user)
    throw createError({ statusCode: 401, statusMessage: '请先登录' })

  if (Number.isNaN(postId))
    throw createError({ statusCode: 400, statusMessage: '参数错误' })
  const post = await postModel.findByPk(postId)
  if (!post || post.isDelete === '1')
    throw createError({ statusCode: 404, statusMessage: '文章不存在' })

  if (post.createBy !== user.username)
    throw createError({ statusCode: 403, statusMessage: '没有权限' })

  return post
})
