export default {
  pwd: {
    saltRounds: 10,
  },
  jwt: {
    secret: 'HS256',
    expires: 24 * 60 * 60,
  },
}
