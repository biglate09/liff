import { mutationField,queryField , stringArg } from '@nexus/schema'

const line = require('@line/bot-sdk');
export const pushMessage = queryField('pushMessage', {
  type: 'String',
  args: {
    to: stringArg({ required: true }),
    mess: stringArg({ required: true }),
  },
  resolve(_, { to, mess }, ctx) {
    const client = new line.Client({
      channelAccessToken: "iZGLXxXhKBXCi3mBNRSAi1y6x+v4QU7R89qx0MXUXY0F1nWjeLVfvA5RmzS+WhHjl+NERQYq4hdahQBlZeIybFXw1Ro6wIfB0xYTf6uKGTLh4wtJPDkChqfArPAAH6ajMYhKFPOYOSaw6Uu13btbtAdB04t89/1O/w1cDnyilFU="
    });
    const message = {
      type: 'text',
      text: `${mess}`
    };
    var result = "pushMessage"
    client.pushMessage(`${to}`, message)
      .then(() => {
        console.log('pushMessage success!')
      })
      .catch(() => {
        console.log('pushMessage error')
      });
    return result
  },
})