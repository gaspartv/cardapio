-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registered_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "storeId" INTEGER,
    "addressId" INTEGER,
    CONSTRAINT "user_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "user_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "pix" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "minimumOrder" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" INTEGER NOT NULL,
    "deliveryOrWhithdrawId" INTEGER NOT NULL,
    "openingId" INTEGER NOT NULL,
    CONSTRAINT "store_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "store_deliveryOrWhithdrawId_fkey" FOREIGN KEY ("deliveryOrWhithdrawId") REFERENCES "deliveryOrWhithdraw" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "store_openingId_fkey" FOREIGN KEY ("openingId") REFERENCES "opening" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "star" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storeName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "note" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    "storeId" INTEGER,
    CONSTRAINT "star_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "storeId" INTEGER,
    CONSTRAINT "product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "opening" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storeName" TEXT NOT NULL,
    "monday" TEXT NOT NULL,
    "tuesday" TEXT NOT NULL,
    "wednesday" TEXT NOT NULL,
    "thursday" TEXT NOT NULL,
    "friday" TEXT NOT NULL,
    "saturday" TEXT NOT NULL,
    "sunday" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "deliveryOrWhithdraw" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "delivery" BOOLEAN NOT NULL,
    "whithdraw" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "productsId" INTEGER,
    CONSTRAINT "category_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "borough" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_storeId_key" ON "user"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_addressId_key" ON "user"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "store_addressId_key" ON "store"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "store_deliveryOrWhithdrawId_key" ON "store"("deliveryOrWhithdrawId");

-- CreateIndex
CREATE UNIQUE INDEX "store_openingId_key" ON "store"("openingId");
