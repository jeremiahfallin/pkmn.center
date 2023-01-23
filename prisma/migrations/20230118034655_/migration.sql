/*
  Warnings:

  - You are about to drop the column `userId` on the `PokemonOffer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `userId` ON `PokemonOffer`;

-- AlterTable
ALTER TABLE `PokemonOffer` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_PokemonOfferToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PokemonOfferToUser_AB_unique`(`A`, `B`),
    INDEX `_PokemonOfferToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
