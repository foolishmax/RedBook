const { User } = require('../model');
const { createToken } = require('../util/jwt');

exports.register = async (ctx, next) => {
  const user = new User(ctx.request.body);
  const dbUser = await user.save();

  ctx.body = dbUser;
};

exports.login = async (ctx, next) => {
  const dbUser = await User.findOne(ctx.request.body, [
    'username',
    'email',
    'phone',
    'createTime',
  ]);
  if (!dbUser) {
    return (ctx.body = {
      error: {
        code: -1,
        message: '手机号或者密码不正确',
      },
    });
  }

  const token = await createToken(dbUser['_doc']);

  dbUser['_doc'].token = token;
  dbUser['_doc'].avatar = `http://${ctx.host}/article/article01/img_01.jpg`;
  ctx.body = {
    code: 0,
    data: dbUser['_doc'],
  };
};
