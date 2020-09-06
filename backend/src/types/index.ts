import { schema } from "nexus";

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
