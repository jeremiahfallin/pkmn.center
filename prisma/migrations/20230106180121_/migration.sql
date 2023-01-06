/*
  Warnings:

  - You are about to drop the column `types` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `typeOne` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pokemon` DROP COLUMN `types`,
    ADD COLUMN `typeOne` ENUM('normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NOT NULL,
    ADD COLUMN `typeTwo` ENUM('normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL;
