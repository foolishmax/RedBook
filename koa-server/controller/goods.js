const { top10Category, goods } = require('../config/goods');
const { sleep } = require('../util/sleep');

exports.getGoodsList = async (ctx, next) => {
  const { page, size = 10 } = ctx.request.query;
  await sleep(2000);
  let result = [];
  const sub = goods.slice((page - 1) * size, page * size);
  result = sub.map((item) => {
    return {
      ...item,
      image: `http://${ctx.host}${item.image}`,
    };
  });

  ctx.body = {
    code: 0,
    data: result,
  };
};

exports.getTop10Category = async (ctx) => {
  console.log('333');
  const result = top10Category.map((item) => {
    return {
      ...item,
      image: `http://${ctx.host}${item.image}`,
    };
  });
  ctx.body = {
    code: 0,
    data: result,
  };
};
