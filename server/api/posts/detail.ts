import type { Post } from '~/types/post'
import type { ResponseEntity } from '~/types/global'
import postModel from '../../database/modules/PostEntity'

export default defineEventHandler(async (event): Promise<ResponseEntity<Post>> => {
  const query = getQuery<{ postId: number }>(event)
  return await postModel.findByPk(query.postId).then((data: Post | null) => {
    if (data && data.isDelete === '0') {
      return {
        code: 200,
        data: data,
        message: 'ok'
      }
    }
    throw createError({ statusCode: 404, statusMessage: '文章不不存在' })
  }).catch((e) => {
    throw createError({ statusCode: 500, statusMessage: e.message })
  })
})
