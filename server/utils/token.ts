import jwt from 'jsonwebtoken';
import securityConfig from '../config/security.config';
import { dayjs } from 'element-plus';

interface UserInfoType {
  userId: number
  username: string
  auth: string
  exp?: number
  iat?: number
}

export function generateToken(userInfo: UserInfoType, expires: number = securityConfig.jwt.expires) {
  return jwt.sign(
    userInfo, securityConfig.jwt.secret, {
    expiresIn: expires
  });
}
export function verifyToken(token: string) {
  return new Promise<UserInfoType>((resolve, reject) => {
    jwt.verify(token.replace('Bearer ', ''), securityConfig.jwt.secret, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case 'NotBeforeError':
          case 'JsonWebTokenError':
          case 'TokenExpiredError':
            reject(err.message)
        }
      }
      resolve(decoded as UserInfoType)
    })
  })
}


export default {
  generateToken,
  verifyToken
}
