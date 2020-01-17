# Migration `20200116161237-initial`

This migration has been generated by Marvin ROGER at 1/16/2020, 4:12:37 PM.
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
migration ..20200116161237-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,48 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+}
+
+model FlightRule {
+  id    String  @default(cuid()) @id
+  flightId String
+  origin String
+  destination String
+
+  businessInitialPrice Int
+  businessSeats Int
+  businessNextPriceRatio Int
+  ecoInitialPrice Int
+  ecoSeats Int
+  ecoNextPriceRatio Int
+
+  flights Flight[]
+}
+
+model Flight {
+  id    String  @default(cuid()) @id
+  date DateTime
+
+  rule FlightRule
+
+  seats Seat[]
+}
+
+enum Class {
+  ECO
+  BUSINESS
+}
+
+model Seat {
+  id    String  @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  flight Flight
+  class Class
+
+  name String
+}
```

