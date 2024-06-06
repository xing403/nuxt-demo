import { Category } from '~/types/category'
import categoryModel from '~/server/database/modules/CategoryEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'
import { ResponseEntity } from '~/types/global'

export default defineEventHandler(async (event): Promise<ResponseEntity<Array<Category>>> => {
  const self = await getLoginUser(event)
  const result = await categoryModel.findAndCountAll({
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
