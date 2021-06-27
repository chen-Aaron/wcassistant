const {
    Message,
    log
} = require('wechaty')
const {
    msgTextBot
} = require('./msgbot');
const MessageType = Message.Type;
/**
 * toUserId: wxid_xxx | xxx@chatroom
 * payload: string | number | Message | Contact | FileBox | MiniProgram | UrlLink
 */
const sendMessage = async (bot, toUserId, payload) => {
    const toContact = await bot.Contact.load(toUserId);
    const message = await toContact.say(payload);
    return message;
};

const recieveMessage = async (bot, cb) => {
    bot.on("message", async (message) => {
        cb.call(null, message);
    });
}

const dealMessage = async (message) => {
    switch (message.type()) {
        // 文本消息
        case MessageType.Text:
            const res = await msgTextBot(message);
            break;

            // 图片消息
        case MessageType.Image:
            const messageImage = await message.toImage();

            // 缩略图
            const thumbImage = await messageImage.thumbnail();
            const thumbImageData = await thumbImage.toBuffer();
            // thumbImageData: 缩略图图片二进制数据

            // 大图
            const hdImage = await messageImage.hd();
            const hdImageData = await hdImage.toBuffer();
            // 大图图片二进制数据

            // 原图
            const artworkImage = await messageImage.artwork();
            const artworkImageData = await artworkImage.toBuffer();
            // artworkImageData: 原图图片二进制数据

            break;

            // 链接卡片消息
        case MessageType.Url:
            const urlLink = await message.toUrlLink();
            // urlLink: 链接主要数据：包括 title，URL，description

            const urlThumbImage = await message.toFileBox();
            const urlThumbImageData = await urlThumbImage.toBuffer();
            // urlThumbImageData: 链接的缩略图二进制数据

            break;

            // 小程序卡片消息
        case MessageType.MiniProgram:
            const miniProgram = await message.toMiniProgram();
            /*
            miniProgram: 小程序卡片数据
            {
              appid: "wx363a...",
              description: "贝壳找房 - 真房源",
              title: "美国白宫，10室8厅9卫，99999刀/月",
              iconUrl: "http://mmbiz.qpic.cn/mmbiz_png/.../640?wx_fmt=png&wxfrom=200",
              pagePath: "pages/home/home.html...",
              shareId: "0_wx363afd5a1384b770_..._1615104758_0",
              thumbKey: "84db921169862291...",
              thumbUrl: "3051020100044a304802010002046296f57502033d14...",
              username: "gh_8a51...@app"
            }
           */
            break;

            // 语音消息
        case MessageType.Audio:
            const audioFileBox = await message.toFileBox();

            const audioData = await audioFileBox.toBuffer();
            // audioData: silk 格式的语音文件二进制数据
            break;

            // 视频消息
        case MessageType.Video:
            const videoFileBox = await message.toFileBox();

            const videoData = await videoFileBox.toBuffer();
            // videoData: 视频文件二进制数
            break;

            // 动图表情消息
        case MessageType.Emoticon:
            const emotionFile = await message.toFileBox();

            const emotionData = await emotionFile.toBuffer();
            // emotionData: 动图 Gif文件 二进制数据

            break;

            // 文件消息
        case MessageType.Attachment:
            const attachFileBox = await message.toFileBox();

            const attachData = await attachFileBox.toBuffer();
            // attachData: 文件二进制数据

            break;

            // 其他消息
        default:
            break;
    }
}

module.exports = {
    sendMessage,
    recieveMessage,
    dealMessage
}