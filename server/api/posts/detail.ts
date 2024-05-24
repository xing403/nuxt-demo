import type { Post } from '~/types/post'
import type { ResponseEntity } from '~/types/global'
import postModel from '../../database/modules/PostEntity'

export default defineEventHandler(async (event): Promise<ResponseEntity<Post>> => {
  const query = getQuery(event)
  const post = await postModel.findByPk(Number(query.postId))
  if (post && post.isDelete === '0') {
    return {
      code: 200,
      data: post as Post,
      message: '获取成功'
    }
  }
  return {
    code: 404,
    message: '文章不存在'
  }
})
