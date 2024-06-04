import tokenUtil from '~/server/utils/token'
import userModel from '~/server/database/modules/UserEntity'

export const getLoginUser = defineEventHandler(async (event) => {
  const header = getRequestHeaders(event)

  if (!header['authorization'])
    throw createError({ statusCode: 403, statusMessage: '无权限' })
  const tokenInfo = await tokenUtil.verifyToken(header['authorization'])

  return {
    info: tokenInfo,
    user: await userModel.findByPk(tokenInfo.userId, {
      having: {
        'isDelete': '0'
      }
    })
  }
})
