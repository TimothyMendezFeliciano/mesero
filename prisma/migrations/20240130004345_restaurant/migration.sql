-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "restaurantMenuId" TEXT NOT NULL,
    "previousAvgOrderCount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "newAvgOrderCount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantMenu" (
    "id" TEXT NOT NULL,

    CONSTRAINT "RestaurantMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "coordinates" TEXT NOT NULL,
    "restaurandId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "restaurantId" TEXT,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "availability" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "categoriesId" TEXT NOT NULL,
    "restaurantMenuId" TEXT,

    CONSTRAINT "MenuItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Restaurant_name_idx" ON "Restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_restaurandId_key" ON "Location"("restaurandId");

-- CreateIndex
CREATE INDEX "Location_coordinates_idx" ON "Location"("coordinates");

-- CreateIndex
CREATE INDEX "Location_latitude_longitud_idx" ON "Location"("latitude", "longitud");

-- CreateIndex
CREATE INDEX "Location_latitude_longitud_restaurandId_idx" ON "Location"("latitude", "longitud", "restaurandId");

-- CreateIndex
CREATE INDEX "MenuItems_availability_idx" ON "MenuItems"("availability");

-- CreateIndex
CREATE INDEX "MenuItems_title_idx" ON "MenuItems"("title");

-- CreateIndex
CREATE INDEX "MenuItems_availability_title_idx" ON "MenuItems"("availability", "title");

-- CreateIndex
CREATE INDEX "Categories_title_idx" ON "Categories"("title");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurantMenuId_fkey" FOREIGN KEY ("restaurantMenuId") REFERENCES "RestaurantMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_restaurandId_fkey" FOREIGN KEY ("restaurandId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItems" ADD CONSTRAINT "MenuItems_restaurantMenuId_fkey" FOREIGN KEY ("restaurantMenuId") REFERENCES "RestaurantMenu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
