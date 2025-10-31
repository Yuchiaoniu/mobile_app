// 範例：驗證 token 的中介層
function auth(req, res, next) {
  // TODO: 驗證 JWT 或其他授權邏輯
  next();
}
module.exports = { auth };
