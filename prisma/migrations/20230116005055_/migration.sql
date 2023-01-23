/*
  Warnings:

  - You are about to drop the column `level` on the `PokemonOffer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PokemonOffer` DROP COLUMN `level`,
    ADD COLUMN `maxLevel` INTEGER NULL,
    ADD COLUMN `minLevel` INTEGER NULL;
