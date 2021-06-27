const {
    log
} = require('wechaty');
const {
    sendWord,
    recieveWord
} = require('../http');

let glob = null;

const reciveWord = async (msg) => {
    try {
        const text = msg.text();
        const res = await recieveWord();
        const word = res[0].data.info.content;
        if (word === text) {
            reciveWord(msg);
        } else {
            await msg.say(word);
            log.info(`回应:【${text}】的消息--${msg.date()}, ${word}`);
        }
    } catch (e) {
        log.error('接收回应接口报错:', e)
    }
}

const msgTextBot = async (msg) => {
    try {
        const text = msg.text();
        log.info(`接收到被发送的消息:${text}`)
        await sendWord(text);
        await reciveWord(msg);
        // recieveWord(async (res) => {
        //     const word = res[0].data.info.content;
        //     if (word === text) {
        //         recieveWord(async (theWord) => {
        //             await msg.say(theWord[0].data.info.content);
        //             log.info(`回应:${text}的消息--${msg.date()}, ${theWord[0].data.info.content}`);

        //         })
        //         return;
        //     }
        // });
    } catch (e) {
        new Error('处理接收到的文本消息错误，原因:', e)
    }
}

module.exports = {
    msgTextBot
}