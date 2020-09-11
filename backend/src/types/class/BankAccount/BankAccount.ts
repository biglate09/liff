import { schema } from 'nexus'

schema.objectType({
    name: 'BankAccount',
    definition(t) {
        t.model.id()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.bank()
        t.model.bankAccountName()
        t.model.bankAccountNumber()
    },
})
