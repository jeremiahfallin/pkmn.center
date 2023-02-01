/*
  Warnings:

  - You are about to drop the column `accepted` on the `OfferDetail` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `OfferDetail` table. All the data in the column will be lost.
  - You are about to drop the column `declined` on the `OfferDetail` table. All the data in the column will be lost.
  - Added the required column `status` to the `OfferDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OfferDetail` DROP COLUMN `accepted`,
    DROP COLUMN `completed`,
    DROP COLUMN `declined`,
    ADD COLUMN `status` ENUM('pending', 'accepted', 'declined', 'completed') NOT NULL;
