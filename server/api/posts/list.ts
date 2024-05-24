import { Post } from '~/types/post'
import postModel from '../../database/modules/PostEntity'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page ? Number(query.page) : 1
  const limit = query.limit ? Number(query.limit) : 10
  return await postModel.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      isDelete: '0'
    }
  }).then((res) => {
    return res
  }) as {
    rows: Post[],
    count: number
  }
})
