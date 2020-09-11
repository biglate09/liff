import { schema } from 'nexus'

schema.objectType({
    name: 'Job',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.jobNo()
        t.model.jobType()
        t.model.jobTypeId()
        t.model.startJob()
        t.model.endJob()
        t.model.limit()
        t.model.location()
        t.model.detail()
        t.model.tel()
        t.model.email()
        t.model.guest()
        t.model.startBudget()
        t.model.endBudget()
        t.model.status()
        t.model.customer()
        t.model.customerId()
        t.model.photographer()
        t.model.photographerId()
        t.model.slip()
    },
})
