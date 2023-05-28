const { articles } = require('../config/articles');
const { sleep } = require('../util/sleep');

exports.getArticleDetail = async (ctx, next) => {
  const { id } = ctx.request.query;
  await sleep(1000);

  const findItem = articles.find((item) => item.id == id);
  console.log('id', id);
  if (!findItem) {
    return (ctx.body = {
      error: {
        code: -1,
        message: 'not found',
      },
    });
  }

  const article = JSON.parse(JSON.stringify(findItem));
  article.avatarUrl = `http://${ctx.host}${findItem.avatarUrl}`;
  article.images = article.images.map((i) => `http://${ctx.host}${i}`);
  article.comments = article.comments
    ? article.comments.map((i) => {
        return {
          ...i,
          avatarUrl: `http://${ctx.host}${i.avatarUrl}`,
        };
      })
    : [];
  if (article?.comments[0]?.children) {
    const firstCommentChildren = [...article.comments[0].children];
    if (firstCommentChildren?.length) {
      const copySubFirst = firstCommentChildren[0];
      copySubFirst.avatarUrl = `http://${ctx.host}${copySubFirst.avatarUrl}`;
      firstCommentChildren[0] = copySubFirst;
    }
    article.comments[0].children = firstCommentChildren;
  }

  ctx.body = {
    code: 0,
    data: article,
  };
};
