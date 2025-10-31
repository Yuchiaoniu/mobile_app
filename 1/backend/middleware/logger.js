// 範例：請求日誌中介層
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
module.exports = { logger };
