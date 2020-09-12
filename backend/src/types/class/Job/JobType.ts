import { schema } from 'nexus'

schema.objectType({
    name: 'JobType',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.jobTypeName()
    },
})