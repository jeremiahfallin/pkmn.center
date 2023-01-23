/*
  Warnings:

  - Made the column `health` on table `PokemonOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attack` on table `PokemonOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialAttack` on table `PokemonOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defense` on table `PokemonOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialDefense` on table `PokemonOffer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `speed` on table `PokemonOffer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PokemonOffer` MODIFY `health` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `attack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `specialAttack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `defense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `specialDefense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `speed` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL;
