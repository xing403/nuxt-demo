import bcrypt from 'bcrypt'
import securityConfig from '../config/security.config'

export default {
  /**
   * 密码加密
   * @param password 
   * @returns hash password
   */
  encryptPassword: (password: string) => {
    return bcrypt.hashSync(password, securityConfig.pwd.saltRounds)
  },

  /**
   * 密码校验
   * @param password 
   * @param hash 
   * @returns valid result 
   */
  comparePassword: (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
  },
}
