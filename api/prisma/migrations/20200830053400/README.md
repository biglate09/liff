# Migration `20200830053400`

This migration has been generated at 8/30/2020, 12:34:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "EnableStatus" AS ENUM ('SHOW', 'HIDE', 'DELETE')

CREATE TYPE "UserRole" AS ENUM ('CASHIER', 'CHEF')

CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'ONGOING', 'CANCELED', 'TIMEUP', 'COMPLETED')

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"name" text   ,
"userName" text   NOT NULL ,
"password" text   NOT NULL ,
"enableStatus" "EnableStatus"  NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."LogUser" (
"id" text   NOT NULL ,
"userId" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"role" "UserRole"  NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Task" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"total" integer   NOT NULL ,
"status" "TaskStatus"  NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"finishTime" timestamp(3)   NOT NULL ,
"countTime" integer   NOT NULL ,
"priority" integer   NOT NULL ,
"createdBy" text   NOT NULL ,
"updatedBy" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE INDEX "LogUser.userId_index" ON "public"."LogUser"("userId")

CREATE INDEX "Task.createdBy_index" ON "public"."Task"("createdBy")

ALTER TABLE "public"."LogUser" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("createdBy")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200830053400
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,63 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator prisma_client_js {
+  provider = "prisma-client-js"
+}
+
+enum EnableStatus {
+  SHOW
+  HIDE
+  DELETE
+}
+
+enum UserRole {
+  CASHIER
+  CHEF
+}
+
+enum TaskStatus {
+  PENDING
+  ONGOING
+  CANCELED
+  TIMEUP
+  COMPLETED
+}
+
+model User {
+  id        String      @default(uuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  name      String?
+  userName  String
+  password  String
+  enableStatus EnableStatus
+}
+
+model LogUser {
+  id        String      @default(uuid()) @id
+  @@index(userId)
+  user      User     @relation(fields: [userId], references: [id])
+  userId    String
+  createdAt DateTime @default(now())
+  role      UserRole
+}
+
+model Task {
+  id          String      @default(uuid()) @id
+  name        String
+  total       Int
+  status      TaskStatus
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  finishTime  DateTime
+  countTime   Int
+  priority    Int
+  @@index(createdBy)
+  user        User     @relation(fields: [createdBy], references: [id])
+  createdBy   String
+  updatedBy   String
+}
+
```


