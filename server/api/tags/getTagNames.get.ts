import { Tag } from '~/types/tag'
import tagEntity from '~/server/database/modules/TagEntity'
import postModel from '~/server/database/modules/PostEntity'
import { ResponseEntity } from '~/types/global'
import { Op } from 'sequelize'

export default defineEventHandler(async (event): Promise<ResponseEntity<Array<Tag>>> => {
  const query = getQuery<{ postId: number }>(event)
  const post = await postModel.findByPk(query.postId)
  if (!post)
    throw createError({ statusCode: 404, statusMessage: '文章不存在' })

  const tags = post.postTags ? post.postTags.split(',').filter((tag) => tag !== '') : []
  const result = await tagEntity.findAll({
    attributes: ['tagId', 'tagName'],
    where: {
      isDelete: '0',
      tagId: {
        [Op.in]: tags
      }
    }
  })
  return {
    code: 200,
    data: result,
    message: '获取成功'
  }
})
