import { schema } from "nexus";
import { PrismaClient } from '@prisma/client'
import { arg, core, stringArg, intArg, floatArg } from "nexus/components/schema";
import moment from 'moment';
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

const sendMessage = (toUser: String, message: any) => {
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

    //FIND_JOB_MAPPING
    t.field('findJobMapping', {
      type: 'JobMapping',
      args: {
        jobId: stringArg({ required: true }),
        photographerUserId: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const photographer = await prisma.photographer.findOne({
          where: {
            userId: args.photographerUserId
          }
        })

        const jobMapping = await prisma.jobMapping.findOne({
          where:
          {
            jobId_photographerId:
            {
              jobId: args.jobId,
              photographerId: photographer ? photographer.id : ''
            }
          }
        })

        return jobMapping
      }
    })

    //FIND_JOB
    t.field('findJob', {
      type: 'Job',
      args: {
        jobId: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const job = await prisma.job.findOne({
          where: {
            id: args.jobId
          }
        })

        return job
      }
    })

    // //FIND_PHOTOGRAPHER
    // t.field('findPhotographerJobs', {
    //   type: 'Job',
    //   args: {
    //     userId: stringArg({ required: true }),
    //   },
    //   resolve: async (_, args, ctx) => {
    //     const photographer = await prisma.photographer.findOne({
    //       where:
    //       {
    //         userId: args.userId
    //       },
    //       include:{
    //         jobs: true
    //       }
    //     })

    //     return photographer.jobs
    //   }
    // })

    // //FIND_CUSTOMER
    // t.field('findCustomer', {
    //   type: 'Customer',
    //   args: {
    //     userId: stringArg({ required: true }),
    //   },
    //   resolve: async (_, args, ctx) => {
    //     const customer = await prisma.customer.findOne({
    //       where:
    //       {
    //         userId: args.userId
    //       }
    //     })

    //     return customer
    //   }
    // })
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
        jobName: stringArg({ required: true }),
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
            jobName: args.jobName,
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
        let jobStartBudget = job.startBudget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        let jobEndBudget = job.endBudget.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        const messageToCustomer = [
          {
            "type": "flex",
            "altText": "คุณค้นหาช่างภาพแล้ว !",
            "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ประกาศงาน #${job.jobNo}","size":"sm","weight":"bold","align":"start"},{"type":"text","text":"กำลังค้นหาช่างภาพ","color":"#F36E0E","size":"xs","align":"end"}]},{"type":"text","text":"${job.jobName}","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"${job.guest && job.guest > 0 ? 'จำนวนแขก ' + job.guest + ' คน' : ''}","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"${job.location}","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xs","spacing":"sm","contents":[{"type":"text","text":"ปิดรับข้อเสนอ : ${moment(job.limit).format('DD / MM / YYYY')}","size":"sm","color":"#FF0000","flex":0,"align":"start"},{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000","margin":"lg"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม : ${moment(job.startJob).format('DD / MM / YYYY')}","size":"sm","color":"#000000","flex":0},{"type":"text","text":"${moment(job.startJob).format('HH:mm')} น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง : ${moment(job.endJob).format('DD / MM / YYYY')}","size":"sm","color":"#000000","flex":0},{"type":"text","text":"${moment(job.endJob).format('HH:mm')} น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"${jobStartBudget} - ${jobEndBudget} บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"ยกเลิกงาน","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]}]},"styles":{"footer":{"separator":true}}}`)
          }
        ]
        const sendToUser = await sendMessage(args.userId, messageToCustomer)

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
          await sendMessage(pg.userId, messageToPhotographers)
        }

        return (customer && job && jobLog && sendToUser ? true : false)
      },
    })

    //CREATE_JOB_MAPPING
    t.field('createJobMapping', {
      type: 'Boolean',
      args: {
        jobId: stringArg({ required: true }),
        photographerUserId: stringArg({ required: true }),
        price: floatArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const photographer = await prisma.photographer.findOne({
          where: {
            userId: args.photographerUserId
          }
        })

        const jobMapping = await prisma.jobMapping.create({
          data: {
            jobId: args.jobId,
            price: args.price,
            status: 'ACCEPTED',
            photographer: {
              connect: {
                id: photographer ? photographer.id : '',
              },
            },
          },
        })

        let job
        if (jobMapping) {
          job = await prisma.job.findOne({
            where: {
              id: args.jobId
            },
            include: {
              customer: true
            }
          })

          if (job && job.customer) {
            let messageToPhotographer = [
              {
                "type": "text",
                "text": `ส่งคำขอรับงาน #${job.jobNo} เรียบร้อยกรุณารอการตอบรับจากลูกค้าภายในวันที่ ${moment.utc(job.limit).format('DD/MM/YYYY')}`
              }
            ]

            await sendMessage((photographer ? photographer.userId : ''), messageToPhotographer)

            //#Poppy3
            let messageToCustomer = [
              {
                "type": "flex",
                "altText": "มีช่างภาพสนใจทำงานให้คุณ !",
                "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
              }
            ]
            await sendMessage(job.customer.userId, messageToCustomer)
          }
        }

        return (jobMapping && job && jobMapping ? true : false)
      }
    })

    //CUSTOMER_CONFIRM_JOB
    t.field('customerConfirmJob', {
      type: 'Boolean',
      args: {
        jobId: stringArg({ required: true }),
        photographerId: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        let exstingJob, jobMapping, job, jobLog, sendMessageToCustomer, sendMessageToPhotographer;
        exstingJob = await prisma.job.findOne({
          where: {
            id: args.jobId
          }
        })

        jobMapping = await prisma.jobMapping.findOne({
          where: {
            jobId_photographerId: {
              jobId: args.jobId,
              photographerId: args.photographerId
            }
          }
        });

        if (exstingJob && exstingJob.status === 'MAPPING' && jobMapping && jobMapping.status === 'ACCEPTED') {
          job = await prisma.job.update({
            where: {
              id: args.jobId,
            },
            data: {
              status: 'CUSTOMER_CONFIRMED',
              photographer: {
                connect: {
                  id: args.photographerId
                }
              }
            },
            include: {
              customer: true,
              photographer: true
            }
          })
        }

        if (job) {
          jobLog = await prisma.jobLog.create({
            data: {
              jobId: args.jobId,
              jobStatus: 'CUSTOMER_CONFIRMED',
              updatedRole: 'CUSTOMER',
              updatedBy: job.customerId
            }
          })

          if (jobLog) {
            let messageToCustomer = [
              {
                "type": "text",
                "text": `กำลังส่งคำขอไปยังช่างภาพ กรุณารอการตอบรับจากช่างภาพ`
              },
              {
                "type": "text",
                "text": `คุณพร้อมโอนเงินมัดจำ 50% เป็นจำนวนเงิน ${jobMapping?.price ? jobMapping?.price * 0.5 : 0} บาท ภายใน 24 ชม. หรือไม่`
              }
            ]

            sendMessageToCustomer = await sendMessage(job.customer.userId, messageToCustomer)


            //#Poppy4
            let messageToPhotographer = [
              {
                "type": "flex",
                "altText": "ยินดีด้วยลูกค้าสนใจจะจ้างคุณแล้ว !",
                "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
              }
            ]

            sendMessageToPhotographer = await sendMessage(job.photographer?.userId || '', messageToPhotographer)
          }
        }

        return (job && jobLog && sendMessageToCustomer && sendMessageToPhotographer ? true : false)
      }
    })

    //PHOTOGRAPHER_CONFIRM_JOB
    t.field('photographerConfirmJob', {
      type: 'Boolean',
      args: {
        jobId: stringArg({ required: true }),
        photographerId: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        let exstingJob, jobMapping, job, jobLog, sendMessageToCustomer, sendMessageToPhotographer;
        exstingJob = await prisma.job.findOne({
          where: {
            id: args.jobId
          }
        })

        jobMapping = await prisma.jobMapping.findOne({
          where: {
            jobId_photographerId: {
              jobId: args.jobId,
              photographerId: args.photographerId
            }
          }
        });

        if (exstingJob && exstingJob.status === 'CUSTOMER_CONFIRMED' && jobMapping && jobMapping.status === 'ACCEPTED') {

          job = await prisma.job.update({
            where: {
              id: args.jobId,
            },
            data: {
              status: 'PHOTOGRAPHER_CONFIRMED',
              photographer: {
                connect: {
                  id: args.photographerId
                }
              }
            },
            include: {
              customer: true,
              photographer: true
            }
          })

          jobMapping = await prisma.jobMapping.update({
            where: {
              jobId_photographerId: {
                jobId: args.jobId,
                photographerId: args.photographerId
              }
            },
            data: {
              status: 'CONFIRMED'
            }
          })
        }

        if (job) {
          jobLog = await prisma.jobLog.create({
            data: {
              jobId: args.jobId,
              jobStatus: 'PHOTOGRAPHER_CONFIRMED',
              updatedRole: 'PHOTOGRAPHER',
              updatedBy: args.photographerId
            }
          })

          if (jobLog) {
            //#Poppy5
            let messageToPhotographer = [
              {
                "type": "flex",
                "altText": "ยืนยันรับงาน กรุณารอรับเงินมัดจำ !",
                "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
              }
            ]

            sendMessageToPhotographer = await sendMessage(job.photographer?.userId || '', messageToPhotographer)

            //#Poppy6
            let messageToCustomer = [
              {
                "type": "flex",
                "altText": "กรุณาโอนเงินมัดจำ เพื่อเริ่มงาน",
                "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
              }
            ]

            sendMessageToCustomer = await sendMessage(job.customer.userId, messageToCustomer)
          }
        }

        return (job && jobLog && jobMapping && sendMessageToCustomer && sendMessageToPhotographer ? true : false)
      }
    })

    //PHOTOGRAPHER_CANCEL_JOB
    t.field('photographerCancelJob', {
      type: 'Boolean',
      args: {
        jobId: stringArg({ required: true }),
        photographerId: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        let exstingJob, jobMapping, job, jobLog, sendMessageToCustomer, sendMessageToPhotographer;

        jobMapping = await prisma.jobMapping.findOne({
          where: {
            jobId_photographerId: {
              jobId: args.jobId,
              photographerId: args.photographerId
            }
          }
        });

        if (jobMapping) {
          jobMapping = await prisma.jobMapping.update({
            where: {
              jobId_photographerId: {
                jobId: args.jobId,
                photographerId: args.photographerId
              }
            },
            data: {
              status: 'CANCELLED'
            }
          })

          if (jobMapping) {
            exstingJob = await prisma.job.findOne({
              where: {
                id: args.jobId
              }
            })

            if (exstingJob && (exstingJob.status === 'PHOTOGRAPHER_CONFIRMED' || exstingJob.status === 'CUSTOMER_CONFIRMED') && exstingJob.photographerId === args.photographerId) {
              job = await prisma.job.update({
                where: {
                  id: args.jobId,
                },
                data: {
                  status: 'MAPPING',
                  photographer: {
                    disconnect: true
                  }
                },
                include: {
                  customer: true
                }
              })
              if (job) {
                jobLog = await prisma.jobLog.create({
                  data: {
                    jobId: args.jobId,
                    jobStatus: 'MAPPING',
                    updatedRole: 'PHOTOGRAPHER',
                    updatedBy: args.photographerId
                  }
                })

                if (jobLog) {
                  const photographer = await prisma.photographer.findOne({
                    where: {
                      id: args.photographerId
                    }
                  })
                  let messageToCustomer: any = [
                    {
                      "type": "text",
                      "text": `ขออภัย คุณ${photographer?.name} ไม่สามารถรับงานของคุณได้ กรุณาเลือกช่างภาพท่านอื่น`,
                    }
                  ]

                  const acceptedJobMapping = await prisma.jobMapping.findMany({
                    where: {
                      jobId: args.jobId,
                      status: 'ACCEPTED'
                    }
                  })

                  for (let ajm of acceptedJobMapping) {
                    //#Poppy7
                    messageToCustomer.push({
                      "type": "flex",
                      "altText": "มีช่างภาพสนใจทำงานให้คุณ !",
                      "contents": JSON.parse(`{"type":"bubble","body":{"type":"box","layout":"vertical","contents":[{"type":"text","text":"ประกาศงาน #0001","weight":"bold","size":"sm","color":"#000000"},{"type":"text","text":"งานแต่งงาน 1 วัน","weight":"bold","size":"xxl","margin":"md","color":"#000000"},{"type":"text","text":"จำนวนแขก 200 คน","size":"md","color":"#000000","wrap":true,"margin":"sm"},{"type":"text","text":"ที่ VILLE DE BUA 414, ถนนเทพรักษ์ แขวงท่าแร้ง เขตบางเขน ห้อง BALLROOM","size":"xs","color":"#000000","wrap":true,"margin":"sm"},{"type":"box","layout":"vertical","margin":"xxl","spacing":"sm","contents":[{"type":"text","text":"ระยะเวลา","weight":"bold","size":"sm","color":"#000000"},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"เริ่ม 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"07:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"box","layout":"horizontal","contents":[{"type":"text","text":"ถึง 15/08/2020","size":"sm","color":"#000000","flex":0},{"type":"text","text":"17:00 น.","size":"sm","color":"#000000","align":"end"}]},{"type":"text","text":"1,000 - 2,000 บาท / วัน","weight":"bold","size":"lg","margin":"lg","color":"#000000","align":"center"},{"type":"text","text":"*กรุณารับงานภายใน 10/08/2020","size":"sm","color":"#FF0000","flex":0,"align":"center"},{"type":"button","style":"primary","action":{"type":"uri","label":"รับงาน","uri":"https://liff.line.me/1654887993-95d05znD"},"margin":"md","color":"#013490"},{"type":"text","text":"ปฏิเสธงานนี้","size":"xs","color":"#000000","flex":0,"align":"center","margin":"lg","decoration":"underline"}]},{"type":"separator","margin":"xxl"},{"type":"text","text":"ดูข้อเสนอราคาต่ำสุดของงานนี้","weight":"regular","size":"xs","margin":"xl","color":"#013490","align":"center"}]},"styles":{"footer":{"separator":true}}}`)
                    })
                  }

                  sendMessageToCustomer = await sendMessage(job.customer.userId, messageToCustomer)
                }
              }
            }
          }
        } else {
          jobMapping = await prisma.jobMapping.create({
            data: {
              jobId: args.jobId,
              price: 0,
              status: 'CANCELLED',
              photographer: {
                connect: {
                  id: args.photographerId,
                },
              },
            },
          })
        }

        return (job && jobLog && jobMapping && sendMessageToCustomer && sendMessageToPhotographer ? true : false)
      }
    })

    //MANAGE_PHOTOGRAPHER
    t.field('managePhotographer', {
      type: 'Boolean',
      args: {
        userId: stringArg({ required: true }),
        bankAccountNumber: stringArg({ required: true }),
        bankAccountName: stringArg({ required: true }),
        bank: stringArg({ required: true }),
        imgUrl: stringArg({ required: true }),
        name: stringArg({ required: true }),
        tel: stringArg({ required: true }),
        email: stringArg({ required: true }),
        moreInfoUrl: stringArg({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const photographer = await prisma.photographer.findOne({
          where:
          {
            userId: args.userId
          }
        })

        if (photographer) {
          await prisma.photographer.update({
            where: {
              userId: args.userId
            },
            data: {
              bankAccountNumber: args.bankAccountNumber,
              bankAccountName: args.bankAccountName,
              // bank: args.bank,
              imgUrl: args.imgUrl,
              name: args.name,
              tel: args.tel,
              email: args.email,
              moreInfoURL: args.moreInfoUrl
            }
          })
        } else {
          await prisma.photographer.create({
            data: {
              userId: args.userId,
              bankAccountNumber: args.bankAccountNumber,
              bankAccountName: args.bankAccountName,
              // bank: args.bank,
              imgUrl: args.imgUrl,
              name: args.name,
              tel: args.tel,
              email: args.email,
              moreInfoURL: args.moreInfoUrl
            }
          })
        }
        //send flex ?
        return true
      }
    })
  }
})