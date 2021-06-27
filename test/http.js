const {
  sendWord,
  recieveWord,
  updateWord
} = require('../src/http');

const testSendWord = async () => {
  try {
    const testWord = '你好';
    const res = await sendWord(testWord);
    console.log('http', res);
  } catch (e) {
    console.log('errors', e)
  }
}

const recieve = async () => {
  try {
    const res = await recieveWord();
    console.log('recieve', res[0].data.info);
  } catch (e) {
    console.log('errors', e)
  }
}

const testRecievedWord = async () => {
  try {
    await updateWord();

    const testWord = '你太好了';
    recieve();
    const res = await sendWord(testWord);
  } catch (e) {
    console.log('errors', e)
  }
}
// recieve();
// testSendWord();
testRecievedWord();
// const axios = require('./axios');
// axios('https://www.baidu.com')