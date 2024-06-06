import { Tag } from '~/types/tag'
import tagEntity from '~/server/database/modules/TagEntity'
import { getLoginUser } from '~/server/utils/ServletUtil'

export default defineEventHandler(async (event) => {
  const { tagName, tagIcon } = await readBody<Tag>(event)
  const self = await getLoginUser(event)
  if (tagName === '')
    throw createError({ statusCode: 400, message: '标签名称不能为空' })

  const tag = await tagEntity.create({
    tagName,
    tagIcon,
    createBy: self.info.username,
    updateBy: self.info.username,
  })
  if (!tag)
    throw createError({ statusCode: 500, statusMessage: '创建失败', })
  return {
    code: 200,
    data: tag.tagId,
    message: '创建成功',
  }
})
