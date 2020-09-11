import { schema } from 'nexus'

schema.objectType({
    name: 'JobLog',
    definition(t) {
        t.model.jobId()
        t.model.updatedAt()
        t.model.updatedBy()
        t.model.updatedRole()
        t.model.jobStatus()
    },
})
