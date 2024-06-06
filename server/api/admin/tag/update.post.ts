import { Tag } from '~/types/tag'
import tagEntity from '~/server/database/modules/TagEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'

export default defineEventHandler(async (event) => {
  const { tagId, tagName, tagIcon } = await readBody<Tag>(event)
  const self = await getLoginUser(event)
  if (tagName === '')
    throw createError({ statusCode: 400, message: '分类名称不能为空' })

  const tag = await tagEntity.update({
    tagName,
    tagIcon,
    updateBy: self.info.username,
  }, {
    where: {
      tagId: tagId
    }
  })
  if (!tag)
    throw createError({ statusCode: 500, statusMessage: '创建失败', })
  return {
    code: 200,
    message: '修改成功',
  }
})
