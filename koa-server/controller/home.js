const { articles } = require('../config/articles');
const { sleep } = require('../util/sleep');

exports.getHomeList = async (ctx, next) => {
  const { page, size = 10 } = ctx.request.body;
  await sleep(2000);
  let result = [];
  const sub = articles.slice((page - 1) * size, page * size);
  result = sub.map((item) => {
    return {
      id: item.id,
      title: item.title,
      userName: item.userName,
      avatarUrl: `http://${ctx.host}${item.avatarUrl}`,
      favoriteCount: item.favoriteCount,
      isFavorite: item.isFavorite,
      image: `http://${ctx.host}${item.images[0]}`,
    };
  });

  ctx.body = {
    code: 0,
    data: result,
  };
};
