const QRCode = require('qrcode-terminal');
const {
  ScanStatus,
  log
} = require('wechaty')

const {
  createBot
} = require('./bot');
// 登录
exports.prepareBot = async function () {
  try {
    const bot = createBot();
    bot.on('scan', (qrcode, status) => {
      console.info('扫描二维码登录, 状态:', status, ScanStatus.Waiting, qrcode)
      if (status === ScanStatus.Waiting && qrcode) {
        QRCode.generate(qrcode, {
          small: true
        });
      } else {
        log.info("未能获取二维码链接,错误:", `${ScanStatus[status]}(${status})`);
      }
    }).on("login", (user) => {
      log.info("登录成功", `用户 【${user}】 登录成功`);
    }).on("logout", (user, reason) => {
      log.info("退出登录", "用户%s 退出登录, 错误原因:%s", user, reason);
    });
    await bot.start();
    await bot.ready();
    return bot;
  } catch (e) {
    console.log('机器人准备工作失败', e)
  }
}