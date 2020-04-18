# Migration `20200409095938-init`

This migration has been generated by dohaicuong at 4/9/2020, 9:59:38 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Post" (
    "content" TEXT   ,
    "id" TEXT NOT NULL  ,
    "title" TEXT   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."Comment" (
    "content" TEXT   ,
    "id" TEXT NOT NULL  ,
    "postId" TEXT   ,
    PRIMARY KEY ("id"),FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE
) 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200409095938-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,21 @@
+datasource db {
+  provider = "sqlite"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id String @id @default(uuid())
+  title String?
+  content String?
+
+  comments Comment[]
+}
+
+model Comment {
+  id String @id @default(uuid())
+  content String?
+}
```

