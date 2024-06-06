import tagEntity from '~/server/database/modules/TagEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'

export default defineEventHandler(async (event) => {
  const { tagId } = event.context.params as { tagId: string }
  const self = await getLoginUser(event)

  if (!self || !self.user)
    throw createError({ statusCode: 401, statusMessage: '未登录' })

  if (Number.isNaN(Number(tagId)))
    throw createError({ statusCode: 400, statusMessage: '参数错误' })
  const res = await tagEntity.update({ isDelete: '1', updateBy: self.user.username }, { where: { tagId: Number(tagId), createBy: self.user.username, isDelete: '0' } })
  if (res[0] == 0)
    throw createError({ statusCode: 500, statusMessage: '删除失败' })
  return {
    code: 200,
    data: true,
    message: '删除成功',
  }
})
