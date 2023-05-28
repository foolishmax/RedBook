const { messages } = require('../config/messages');
const { sleep } = require('../util/sleep');

exports.getMessageList = async (ctx, next) => {
  const { page, size = 10 } = ctx.request.query;
  await sleep(1000);
  let result = [];
  const sub = messages.slice((page - 1) * size, page * size);
  result = sub.map((item) => {
    return {
      ...item,
      avatarUrl: `http://${ctx.host}${item.avatarUrl}`,
    };
  });

  ctx.body = {
    code: 0,
    data: result,
  };
};

exports.getUnRead = async (ctx) => {
  const result = {
    unreadFavorate: 118,
    newFollow: 20,
    comment: 38,
  };
  ctx.body = {
    code: 0,
    data: result,
  };
};
