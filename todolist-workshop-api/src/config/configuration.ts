export default () => ({
  secret: process.env.SECRET,
  refreshSecret: process.env.SECRET_REFRESH,
})
