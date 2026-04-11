-- CreateTable
CREATE TABLE "Register" (
    "id" INTEGER NOT NULL,
    "period" VARCHAR(48),
    "description" TEXT,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL,
    "registerId" INTEGER,
    "data" BYTEA,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "Register"("id") ON DELETE SET NULL ON UPDATE CASCADE;
