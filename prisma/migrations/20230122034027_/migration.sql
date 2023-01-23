/*
  Warnings:

  - You are about to drop the `_PokemonOfferToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_PokemonOfferToUser`;

-- CreateTable
CREATE TABLE `UserOffer` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `pokemonOfferId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `userId`(`userId`),
    INDEX `pokemonOfferId`(`pokemonOfferId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
