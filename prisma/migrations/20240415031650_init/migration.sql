-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "nama" TEXT,
    "fakultas" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "perwakilan" TEXT NOT NULL,
    "angkatan" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nim_key" ON "User"("nim");
