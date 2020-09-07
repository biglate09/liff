import { schema } from "nexus";
import { arg } from "nexus/components/schema";
const line = require('@line/bot-sdk');

schema.objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

schema.objectType({
  name: "LogUser",
  definition(t) {
    t.model.id();
  },
});

schema.queryType({
  definition(t) {
    t.field('testmsg', {
      type: 'Boolean',
      args: {
        userId: arg({ type: 'String', required: true }),
      },
      resolve: async (_, args, ctx) => {
        console.log('userid', args.userId)
        const client = new line.Client({
          channelAccessToken: "iZGLXxXhKBXCi3mBNRSAi1y6x+v4QU7R89qx0MXUXY0F1nWjeLVfvA5RmzS+WhHjl+NERQYq4hdahQBlZeIybFXw1Ro6wIfB0xYTf6uKGTLh4wtJPDkChqfArPAAH6ajMYhKFPOYOSaw6Uu13btbtAdB04t89/1O/w1cDnyilFU="
        });
        const message = [
          {
            "type": "flex",
            "altText": "คุณมีข้อเสนองานใหม่ !",
            "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
          }
        ]
        var result = "pushMessage"
        client.pushMessage(args.userId, message)
          .then(() => {
            console.log('pushMessage success!')
          })
          .catch(() => {
            console.log('pushMessage error')
          });
        return true
      },
    })
  },
})