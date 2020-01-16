# Migration `watch-20200110101519`

This migration has been generated by Marvin ROGER at 1/10/2020, 10:15:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."FlightRule" (
  "businessInitialPrice" INTEGER NOT NULL DEFAULT 0  ,
  "businessNextPriceRatio" INTEGER NOT NULL DEFAULT 0  ,
  "businessSeats" INTEGER NOT NULL DEFAULT 0  ,
  "destination" TEXT NOT NULL DEFAULT ''  ,
  "ecoInitialPrice" INTEGER NOT NULL DEFAULT 0  ,
  "ecoNextPriceRatio" INTEGER NOT NULL DEFAULT 0  ,
  "ecoSeats" INTEGER NOT NULL DEFAULT 0  ,
  "flightId" TEXT NOT NULL DEFAULT ''  ,
  "id" TEXT NOT NULL   ,
  "origin" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "quaint"."Flight" (
  "date" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "id" TEXT NOT NULL   ,
  "rule" TEXT NOT NULL   REFERENCES "FlightRule"(id) ON DELETE RESTRICT,
  PRIMARY KEY ("id")
);

CREATE TABLE "quaint"."Seat" (
  "class" TEXT NOT NULL DEFAULT 'ECO'  ,
  "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "flight" TEXT NOT NULL   REFERENCES "Flight"(id) ON DELETE RESTRICT,
  "id" TEXT NOT NULL   ,
  "name" TEXT NOT NULL DEFAULT ''  ,
  "updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  PRIMARY KEY ("id")
);
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration watch-20200110094033..watch-20200110101519
--- datamodel.dml
+++ datamodel.dml
@@ -3,24 +3,31 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
-model Flight {
+model FlightRule {
   id    String  @default(cuid()) @id
+  flightId String
   origin String
   destination String
-  date DateTime
   businessInitialPrice Int
   businessSeats Int
   businessNextPriceRatio Int
   ecoInitialPrice Int
   ecoSeats Int
   ecoNextPriceRatio Int
+}
+model Flight {
+  id    String  @default(cuid()) @id
+  date DateTime
+
+  rule FlightRule
+
   seats Seat[]
 }
 enum Class {
```

