import type { Post } from '~/types/post'
import type { ResponseEntity } from '~/types/global'
import postModel from '../../database/modules/PostEntity'

export default defineEventHandler(async (event): Promise<ResponseEntity<Post>> => {
  const query = getQuery(event)
  return await postModel.findByPk(Number(query.postId)).then((post) => {
    if (post && post.isDelete === '0') {
      return {
        code: 200,
        data: post as Post,
        message: 'ok'
      }
    }
    return {
      code: 404,
      message: '文章不存在'
    }
  }).catch((e) => {
    return {
      code: 500,
      message: e.message
    }
  })
})
