import { Tag } from '~/types/tag'
import tagEntity from '~/server/database/modules/TagEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'
import { ResponseEntity } from '~/types/global'

export default defineEventHandler(async (event): Promise<ResponseEntity<Array<Tag>>> => {
  const self = await getLoginUser(event)
  const result = await tagEntity.findAndCountAll({
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      isDelete: '0',
      createBy: self.info.username
    }
  })
  return {
    code: 200,
    data: result.rows,
    message: '获取成功'
  }
})
