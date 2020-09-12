import { log, settings, use, schema } from "nexus";
import { prisma } from "nexus-plugin-prisma";
use(prisma({ features: { crud: true } }));
console.log(process.env.ENV);
let isAdmin = process.env.ENV === "admin";
// if (isAdmin) {
schema.extendType({
  type: "Query",
  definition: (t) => {
    t.crud.jobTypes({
      filtering: true,
      ordering: true,
    });
  },
});
// }
//Run server
if (isAdmin) {
  settings.change({
    schema: {
      generateGraphQLSDLFile: "adminApi.graphql",
    },
    server: {
      cors: true,
      port: 112,
      startMessage: (info) => {
        settings.original.server.startMessage(info);
        log.info("Admin");
      },
    },
  });
} else {
  settings.change({
    schema: {
      generateGraphQLSDLFile: "frontendApi.graphql",
    },
    server: {
      cors: true,
      port: 113,
      startMessage: (info) => {
        settings.original.server.startMessage(info);
        log.info("Frontend");
      },
    },
  });
}
