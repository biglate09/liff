import { schema } from 'nexus'

schema.objectType({
    name: 'Photographer',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.userId()
        t.model.bankAccountNumber()
        t.model.bankAccountName()
        t.model.bank()
        t.model.imgUrl()
        t.model.name()
        t.model.tel()
        t.model.email()
        t.model.moreInfoURL()
    },
})
