# Migration `20200910132447`

This migration has been generated at 9/10/2020, 8:24:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."BankName" AS ENUM ('KBANK', 'DBK', 'BBL', 'KTB', 'BAY', 'KKP', 'JPMCB', 'CITI', 'CIMB', 'SMBT', 'SMBC', 'TMB', 'TISCO', 'TCR', 'SCB', 'TBANK', 'BNPP', 'BAAC', 'MIZUHO', 'MEGA', 'UOBT', 'LHBANK', 'SCBT', 'BOC', 'BOFA', 'GSB', 'GHB', 'ISBT', 'ICBCT', 'HSBC')

CREATE TYPE "public"."JobStatus" AS ENUM ('MAPPING', 'USER_CONFIRMED', 'PHOTOGRAPHER_CONFIRMED', 'ADMIN_CONFIRMED', 'COMPLETED', 'CANCELLED')

CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'CUSTOMER', 'PHOTOGRAPHER')

CREATE TYPE "public"."JobMappingStatus" AS ENUM ('ACCEPTED', 'CANCELLED', 'CONFIRMED')

CREATE TABLE "public"."Customer" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"userId" text   NOT NULL ,
"displayName" text   NOT NULL ,
"email" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Photographer" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"userId" text   NOT NULL ,
"bankAccountNumber" text   NOT NULL ,
"bankAccountName" text   NOT NULL ,
"bank" "BankName"  NOT NULL ,
"imgUrl" text   NOT NULL ,
"name" text   NOT NULL ,
"tel" text   NOT NULL ,
"email" text   NOT NULL ,
"moreInfoURL" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Portfolio" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"photographerId" text   NOT NULL ,
"imgUrl" text []  ,
"info" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."BankAccount" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"bankAccountNumber" text   NOT NULL ,
"bankAccountName" text   NOT NULL ,
"bank" "BankName"  NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Job" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"jobNo" integer   NOT NULL ,
"jobTypeId" text   NOT NULL ,
"startJob" timestamp(3)   NOT NULL ,
"endJob" timestamp(3)   NOT NULL ,
"limit" timestamp(3)   NOT NULL ,
"location" text   NOT NULL ,
"detail" text   NOT NULL ,
"tel" text   NOT NULL ,
"email" text   NOT NULL ,
"guest" integer   NOT NULL ,
"startBudget" Decimal(65,30)   NOT NULL ,
"endBudget" Decimal(65,30)   NOT NULL ,
"status" "JobStatus"  NOT NULL ,
"customerId" text   NOT NULL ,
"photographerId" text   NOT NULL ,
"slip" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."JobType" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"jobTypeName" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."JobMapping" (
"jobId" text   NOT NULL ,
"photographerId" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"price" Decimal(65,30)   NOT NULL ,
"status" "JobMappingStatus"  NOT NULL ,
PRIMARY KEY ("jobId","photographerId")
)

CREATE TABLE "public"."JobLog" (
"jobId" text   NOT NULL ,
"updateAt" timestamp(3)   NOT NULL ,
"updatedBy" text   NOT NULL ,
"updatedRole" "Role"  NOT NULL ,
"jobStatus" "JobStatus"  NOT NULL ,
PRIMARY KEY ("jobId","updateAt")
)

CREATE UNIQUE INDEX "Portfolio_photographerId_unique" ON "public"."Portfolio"("photographerId")

ALTER TABLE "public"."Portfolio" ADD FOREIGN KEY ("photographerId")REFERENCES "public"."Photographer"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Job" ADD FOREIGN KEY ("jobTypeId")REFERENCES "public"."JobType"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Job" ADD FOREIGN KEY ("customerId")REFERENCES "public"."Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Job" ADD FOREIGN KEY ("photographerId")REFERENCES "public"."Photographer"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200910132447
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,169 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator prisma_client_js {
+  provider = "prisma-client-js"
+}
+
+enum BankName {
+  KBANK
+  DBK
+  BBL
+  KTB
+  BAY
+  KKP
+  JPMCB
+  CITI
+  CIMB
+  SMBT
+  SMBC
+  TMB
+  TISCO
+  TCR
+  SCB
+  TBANK
+  BNPP
+  BAAC
+  MIZUHO
+  MEGA
+  UOBT
+  LHBANK
+  SCBT
+  BOC
+  BOFA
+  GSB
+  GHB
+  ISBT
+  ICBCT
+  HSBC
+}
+
+// MAPPING                = เมื่อ Customer กดสร้าง Job
+// USER_CONFIRMED         = เมื่อ Customer กดเลือก Photographer
+// PHOTOGRAPHER_CONFIRMED = เมื่อ Photographer ยืนยันการรับงาน
+// ADMIN_CONFIRMED        = เมื่อ Admin กดยืนยันว่า Slip ที่ลูกค้าแนบมานั้นถูกต้อง
+// COMPLETED              = เมื่อ Customer กดจบงานหลังจากถ่ายรูปและทำอะไรทุกอย่างเสร็จแล้ว
+// CANCELLED              = เมื่อ Job นั้นเกินเวลา limit ที่กำหนด แต่ status ยังไม่เป็น ADMIN_CONFIRMED หรือ COMPLETED (batch job ?)
+enum JobStatus {
+  MAPPING
+  USER_CONFIRMED
+  PHOTOGRAPHER_CONFIRMED
+  ADMIN_CONFIRMED
+  COMPLETED
+  CANCELLED
+}
+
+enum Role {
+  ADMIN
+  CUSTOMER
+  PHOTOGRAPHER
+}
+
+// ACCEPTED  = เมื่อ Photographer กดสนใจงานและยื่นข้อเสนอราคา
+// CANCELLED = เมื่อ Photographer กดปฏิเสธงาน
+// CONFIRMED = เมื่อ Customer กดเลือก Photographer
+enum JobMappingStatus {
+  ACCEPTED
+  CANCELLED
+  CONFIRMED
+}
+
+model Customer {
+  id          String   @default(uuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @default(now())
+  userId      String
+  displayName String
+  email       String
+  jobs        Job[]
+}
+
+model Photographer {
+  id                String    @default(uuid()) @id
+  createdAt         DateTime  @default(now())
+  updatedAt         DateTime  @default(now())
+  userId            String
+  bankAccountNumber String
+  bankAccountName   String
+  bank              BankName
+  imgUrl            String
+  name              String
+  tel               String
+  email             String
+  moreInfoURL       String
+  portfolio         Portfolio
+  jobs              Job[]
+}
+
+model Portfolio {
+  id             String       @default(uuid()) @id
+  createdAt      DateTime     @default(now())
+  updatedAt      DateTime     @default(now())
+  photographer   Photographer @relation(fields: [photographerId], references: [id])
+  photographerId String
+  imgUrl         String[]
+  info           String
+}
+
+model BankAccount {
+  id                String   @default(uuid()) @id
+  createdAt         DateTime @default(now())
+  updatedAt         DateTime @default(now())
+  bankAccountNumber String
+  bankAccountName   String
+  bank              BankName
+}
+
+model Job {
+  id             String       @default(uuid()) @id
+  createdAt      DateTime     @default(now())
+  updatedAt      DateTime     @default(now())
+  jobNo          Int
+  jobType        JobType      @relation(fields: [jobTypeId], references: [id])
+  jobTypeId      String
+  startJob       DateTime
+  endJob         DateTime
+  limit          DateTime
+  location       String
+  detail         String
+  tel            String
+  email          String
+  guest          Int
+  startBudget    Float
+  endBudget      Float
+  status         JobStatus
+  Customer       Customer     @relation(fields: [customerId], references: [id])
+  customerId     String
+  Photographer   Photographer @relation(fields: [photographerId], references: [id])
+  photographerId String
+  slip           String
+}
+
+model JobType {
+  id          String   @default(uuid()) @id
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @default(now())
+  jobTypeName String
+  jobs        Job[]
+}
+
+model JobMapping {
+  jobId          String
+  photographerId String
+  createdAt      DateTime         @default(now())
+  updatedAt      DateTime         @default(now())
+  price          Float
+  status         JobMappingStatus
+  @@id([jobId, photographerId])
+}
+
+model JobLog {
+  jobId       String
+  updateAt    DateTime
+  updatedBy   String
+  updatedRole Role
+  jobStatus   JobStatus
+  @@id([jobId, updateAt])
+}
```


