import { Post } from '~/types/post'
import postModel from '../../database/modules/PostEntity'
import { ResponseEntity } from '~/types/global'

export default defineEventHandler(async (event): Promise<ResponseEntity<{
  rows: Post[],
  count: number
}>> => {
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
    return {
      code: 200,
      data: {
        rows: res.rows,
        count: res.count
      },
      message: '查询成功'
    }
  }).catch((err) => {
    return {
      code: 500,
      data: undefined,
      message: err.message
    }
  })
})
