const {
  prepareBot
} = require('./login');

const {
  getAllPerson,
  findByName
} = require('./person');


const {
  sendMessage,
  recieveMessage,
  dealMessage
} = require('./message');
const start = async () => {
  try {
    const bot = await prepareBot();
    const person = await getAllPerson(bot, '大号');
    recieveMessage(bot, dealMessage);
    // const message = await sendMessage(bot, "chenzhuanyon", "Hello World");

    // console.log('say', message)
    // console.log('person', person);
  } catch (e) {
    console.log('服务出错,原因:', e)
  }
}
start();