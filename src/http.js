const axios = require('./axios');
const qs = require('qs');
const weiboUrl = 'https://api.weibo.com/webim/2/direct_messages/new.json';
const weiboReciveUrl = 'https://web.im.weibo.com/im/connect';
const updateUrl = 'https://api.weibo.com/webim/2/direct_messages/set_unread_count.json';
const channel = '/meta/connect';
const {
  weibo
} = require('./config/index');
const {
  source,
  urid,
  clientId: clientid
} = weibo;

const updateWord = async () => {
  try {
    const params = {
      is_include_group: 0,
      type: 2,
      uid: urid,
      source: source,
    }
    const res = await axios({
      method: 'post',
      url: updateUrl,
      data: qs.stringify(params),
    })
    console.log('update');
  } catch (e) {
    console.log('更新接口错误,原因:', e);
  }
}
/**
 * 
 * params范本
 * text: 饿
 * uid: 5175429989
 * extensions: {"clientid":"496gf1rg78adiqe01wxt7opeoht52o"}
 * is_encoded: 0
 * decodetime: 1
 * source: 209678993
 */
const sendWord = async (text) => {
  try {
    const params = {
      text,
      uid: urid,
      extensions: {
        clientid
      },
      is_encoded: 0,
      decodetime: 1,
      source: weibo.source
    }
    const res = await axios({
      method: 'POST',
      url: weiboUrl,
      data: qs.stringify(params),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    if (res.status === 200) {
      return res.data;
    }
    throw new Error(res.status);
  } catch (e) {
    console.log('发送智能AI错误,原因:', e);
  }
}

/**
 * [{"channel":"/meta/connect","clientId":"496gf1rg78adiqe01wxt7opeoht52o"}]
 * return 
 * [
    {
        "data": {
            "ext": {
                "dm_type": 1,
                "source_msg_id": 0,
                "msg_source": 0,
                "autoReply": true,
                "sender_box_type": "0"
            },
            "push_did": "1624582164727",
            "type": "msg",
            "dm_isRemind": 0,
            "items": [
                [
                    5175429989,
                    "刚才为什么一直说同样的话",
                    1624582164000,
                    "",
                    "",
                    [],
                    "4651897119836899",
                    0
                ]
            ],
            "info": {
                "dm_type": 1,
                "receiver_box_type": 0,
                "fromuid": 5175429989,
                "resource": "",
                "media_type": 0,
                "comment": "",
                "time": 1624582164000,
                "dmid": "4651897119836899",
                "content": "刚才为什么一直说同样的话"
            }
        },
        "channel": "/im/2113434400"
    },
    {
        "advice": {
            "interval": 0,
            "timeout": 170000,
            "reconnect": "retry"
        },
        "channel": "/meta/connect",
        "successful": true
    }
]
 */
const recieveWord = async (cb) => {
  try {
    const params = [{
      connectionType: 'long-polling',
      channel,
      clientId: clientid
    }];

    const res = await axios({
      method: 'POST',
      url: weiboReciveUrl,
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    cb && cb.call(null, res.data);
    // console.log('res', res.data[0].data.info)
    // recieveWord();
    if (res.status === 200) {
      return res.data;
    }
    throw new Error(res.status);
  } catch (e) {
    console.log('接收智能AI错误,原因:', e)
  }
}

module.exports = {
  sendWord,
  recieveWord,
  updateWord
}