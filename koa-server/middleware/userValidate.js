const Joi = require('joi');
const { User } = require('../model');

module.exports.registerValidate = async (ctx, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.required(),
  }).validate(ctx.request.body);

  if (schema.error) {
    ctx.throw(400, schema.error);
  }

  const userExist = await User.findOne({ email: ctx.request.body.email });

  if (userExist) {
    ctx.throw(400, '邮箱已被注册');
  }

  await next();
};

module.exports.loginValidate = async (ctx, next) => {
  const schema = Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }).validate(ctx.request.body);

  if (schema.error) {
    ctx.throw(400, schema.error);
  }

  const userExist = await User.findOne({ phone: ctx.request.body.phone });

  if (!userExist) {
    ctx.throw(400, '手机未注册');
  }

  await next();
};
