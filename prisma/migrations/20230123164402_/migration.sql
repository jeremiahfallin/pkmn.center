/*
  Warnings:

  - Made the column `health` on table `PokemonListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attack` on table `PokemonListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialAttack` on table `PokemonListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defense` on table `PokemonListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialDefense` on table `PokemonListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `speed` on table `PokemonListing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PokemonListing` MODIFY `health` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `attack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `specialAttack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `defense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `specialDefense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL,
    MODIFY `speed` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NOT NULL;
