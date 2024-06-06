import { Tag } from '~/types/tag'
import tagEntity from '~/server/database/modules/TagEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'
import { ResponseEntity } from '~/types/global'

export default defineEventHandler(async (event): Promise<ResponseEntity<{ rows: Tag[], count: number }>> => {
  const self = await getLoginUser(event)
  const query = getQuery<{ page?: number, limit?: number }>(event)
  const page = Number(query.page ?? 1)
  const limit = Number(query.limit ?? 10)
  return await tagEntity.findAndCountAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      isDelete: '0',
      createBy: self.info.username
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
