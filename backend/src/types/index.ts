import { schema } from "nexus";
import { PrismaClient } from '@prisma/client'
import { arg, core, stringArg, intArg, floatArg } from "nexus/components/schema";
const line = require('@line/bot-sdk');

let isAdmin = process.env.ENV === "admin";
const channelAccessToken = 'iZGLXxXhKBXCi3mBNRSAi1y6x+v4QU7R89qx0MXUXY0F1nWjeLVfvA5RmzS+WhHjl+NERQYq4hdahQBlZeIybFXw1Ro6wIfB0xYTf6uKGTLh4wtJPDkChqfArPAAH6ajMYhKFPOYOSaw6Uu13btbtAdB04t89/1O/w1cDnyilFU='

const prisma = new PrismaClient()

const dateTimeArg = (
  opts: core.NexusArgConfig<'DateTime'>
) => arg({ ...opts, type: "DateTime" })

const client = new line.Client({
  channelAccessToken: channelAccessToken
});

const sendFlexMessage = (toUser: String, message: any) => {
  return client.pushMessage(toUser, message)
    .then(() => {
      console.log('pushMessage success!')
      return true
    })
    .catch(() => {
      console.log('pushMessage error')
      return false
    });
}

// if (isAdmin) {
//   schema.queryType({
//     definition(t) {
//       t.field('helloworld', {
//         type: 'String',
//         resolve: async (_, args, ctx) => {
//           return 'HELLO WORLD QUERY'
//         }
//       })
//     }
//   })

//   schema.mutationType({
//     definition(t) {
//       t.field('helloworld', {
//         type: 'String',
//         resolve: async (_, args, ctx) => {
//           return 'HELLO WORLD MUTATION'
//         }
//       })

//       t.field('testmsg', {
//         type: 'Boolean',
//         args: {
//           userId: arg({ type: 'String', required: true }),
//         },
//         resolve: async (_, args, ctx) => {
//           console.log('userid', args.userId)
//           const client = new line.Client({
//             channelAccessToken: "iZGLXxXhKBXCi3mBNRSAi1y6x+v4QU7R89qx0MXUXY0F1nWjeLVfvA5RmzS+WhHjl+NERQYq4hdahQBlZeIybFXw1Ro6wIfB0xYTf6uKGTLh4wtJPDkChqfArPAAH6ajMYhKFPOYOSaw6Uu13btbtAdB04t89/1O/w1cDnyilFU="
//           });
//           const message = [
//             {
//               "type": "flex",
//               "altText": "คุณมีข้อเสนองานใหม่ !",
//               "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
//             }
//           ]
//           var result = "pushMessage"
//           client.pushMessage(args.userId, message)
//             .then(() => {
//               console.log('pushMessage success!')
//             })
//             .catch(() => {
//               console.log('pushMessage error')
//             });
//           return true
//         },
//       })
//     },
//   })
// }

schema.queryType({
  definition(t) {
    t.field('helloworld', {
      type: 'String',
      resolve: async (_, args, ctx) => {
        return 'HELLO WORLD QUERY'
      }
    })
  }
})

//Mutation
schema.mutationType({
  definition(t) {
    t.field('helloworld', {
      type: 'String',
      resolve: async (_, args, ctx) => {
        return 'HELLO WORLD QUERY'
      }
    })

    //CREATE_JOB
    t.field('createJob', {
      type: 'Boolean',
      args: {
        userId: stringArg({ required: true }),
        jobTypeId: stringArg({ required: true }),
        startJob: dateTimeArg({ type: 'DateTime' }),
        endJob: dateTimeArg({ type: 'DateTime' }),
        location: stringArg({ required: true }),
        guest: intArg({ required: false }),
        detail: stringArg({ required: false }),
        startBudget: floatArg({ required: true }),
        endBudget: floatArg({ required: true }),
        tel: stringArg({ required: true }),
        email: stringArg({ required: false }),
        limit: dateTimeArg({ type: 'DateTime' }),
        displayName: stringArg({ required: true }),
        lineEmail: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        let customer = await prisma.customer.findOne({
          where: { userId: args.userId }
        })

        if (!customer) {
          // สร้างใหม่โดยใช้ userId (id ของ line)
          customer = await prisma.customer.create({
            data: {
              userId: args.userId,
              displayName: args.displayName,
              email: args.lineEmail
            },
          })
        } else {
          // อัพเดทข้อมูลลูกค้ากันหน่อย เผื่อลูกค้าเปลี่ยนชื่อไรงี้
          customer = await prisma.customer.update({
            where: {
              id: customer.id
            },
            data: {
              displayName: args.displayName,
              email: args.lineEmail
            }
          })
        }

        //Create job
        let job = await prisma.job.create({
          data: {
            jobType: {
              connect: {
                id: args.jobTypeId,
              },
            },
            startJob: args.startJob,
            endJob: args.endJob,
            location: args.location,
            guest: args.guest,
            detail: args.detail,
            startBudget: args.startBudget,
            endBudget: args.endBudget,
            tel: args.tel,
            email: args.email,
            limit: args.limit,
            status: 'MAPPING',
            customer: {
              connect: {
                id: customer.id,
              },
            }
          }
        })

        let jobLog
        if (job) {
          jobLog = await prisma.jobLog.create({
            data: {
              jobId: job.id,
              updatedBy: customer.id,
              updatedRole: 'CUSTOMER',
              jobStatus: 'MAPPING'
            }
          })
        }

        //Send flex message to customer (#Poppy1)
        const messageToUser = [
          {
            "type": "flex",
            "altText": "คุณค้นหาช่างภาพแล้ว !",
            "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
          }
        ]
        const sendToUser = await sendFlexMessage(args.userId, messageToUser)

        //Send flex message to all photographers (#Poppy2)
        const messageToPhotographers = [
          {
            "type": "flex",
            "altText": "คุณมีข้อเสนองานใหม่ !",
            "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
          }
        ]

        const photographers = await prisma.photographer.findMany()

        console.log(photographers);

        for (let pg of photographers) {
          await sendFlexMessage(pg.userId, messageToPhotographers)
        }

        return (customer && job && jobLog && sendToUser)
      },
    })
  }
})