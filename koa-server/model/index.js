const mongoose = require('mongoose');

const { mongoPath } = require('../config/config.default');

async function main() {
  await mongoose.connect(mongoPath);
}

main()
  .then((res) => {
    console.log('mongodb 连接成功');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  User: mongoose.model('user', require('./user')),
};
