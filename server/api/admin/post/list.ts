import { Post } from '~/types/post'
import postModel from '~/server/database/modules/PostEntity'
import { ResponseEntity } from '~/types/global'

export default defineEventHandler(async (event): Promise<ResponseEntity<{ rows: Post[], count: number }>> => {
  const query = getQuery<{ page?: number, limit?: number }>(event)
  const page = Number(query.page ?? 1)
  const limit = Number(query.limit ?? 10)
  return await postModel.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      isDelete: '0'
    }
  }).then((data) => {
    return {
      code: 200,
      data,
      message: '查询成功'
    }
  }).catch((err) => {
    throw createError({ statusCode: 500, statusMessage: err.message })
  })
})
