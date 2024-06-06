import { Category } from "~/types/category"
import categoryModel from '~/server/database/modules/CategoryEntity'

export default defineEventHandler(async (event) => {
  const { categoryId, categoryName, categoryDesc, categoryIcon } = await readBody<Category>(event)
  const self = await getLoginUser(event)
  if (categoryName === '')
    throw createError({ statusCode: 400, message: '分类名称不能为空' })

  const category = await categoryModel.update({
    categoryName,
    categoryDesc,
    categoryIcon,
    updateBy: self.info.username,
  }, {
    where: {
      categoryId: categoryId
    }
  })
  if (!category)
    throw createError({ statusCode: 500, statusMessage: '创建失败', })
  return {
    code: 200,
    message: '修改成功',
  }
})
