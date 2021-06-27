const {
  Wechaty,
} = require("wechaty");
const {
  PuppetPadlocal
} = require("wechaty-puppet-padlocal");
const {
  token
} = require('./config/index');

// 创建机器人
module.exports.createBot = function () {
  const puppet = new PuppetPadlocal({
    token,
  });

  return new Wechaty({
    name: "BotName",
    puppet,
  });
}