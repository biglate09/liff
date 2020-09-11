import { schema } from 'nexus'

schema.objectType({
    name: 'Customer',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.userId()
        t.model.displayName()
        t.model.email()
    },
})
