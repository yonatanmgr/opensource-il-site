-- CreateTable
CREATE TABLE "FileStore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "fileType" TEXT NOT NULL DEFAULT 'json',
    "file" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FileStore_filename_key" ON "FileStore"("filename");
