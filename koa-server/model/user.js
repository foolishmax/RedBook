const mongoose = require('mongoose');
const base = require('./base');
const md5 = require('../util/md5');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value), // 加密后入库
    select: false, // 查询时过滤掉密码选项
  },
  ...base,
});

module.exports = userSchema;
