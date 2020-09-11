import { schema } from 'nexus'

schema.objectType({
    name: 'JobMapping',
    definition(t) {
        t.model.jobId()
        t.model.photographer()
        t.model.photographerId()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.price()
        t.model.status()
    },
})
