/*
  Warnings:

  - The values [any] on the enum `PokemonOffer_nature` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_teraType` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_region` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_nature` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_teraType` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_region` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_nature` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_teraType` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PokemonOffer_region` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `PokemonListing` MODIFY `health` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `attack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `specialAttack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `defense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `specialDefense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `speed` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `nature` ENUM('unspecified', 'hardy', 'lonely', 'adamant', 'naughty', 'brave', 'bold', 'docile', 'impish', 'lax', 'relaxed', 'modest', 'mild', 'bashful', 'rash', 'quiet', 'calm', 'gentle', 'careful', 'quirky', 'sassy', 'timid', 'hasty', 'jolly', 'naive', 'serious') NULL,
    MODIFY `teraType` ENUM('unspecified', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL,
    MODIFY `region` ENUM('unspecified', 'ENG', 'JPN', 'SPA', 'SPEU', 'FRE', 'GER', 'ITA', 'CHT', 'CHS', 'KOR') NULL;

-- AlterTable
ALTER TABLE `PokemonOffer` MODIFY `health` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `attack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `specialAttack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `defense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `specialDefense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `speed` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `nature` ENUM('unspecified', 'hardy', 'lonely', 'adamant', 'naughty', 'brave', 'bold', 'docile', 'impish', 'lax', 'relaxed', 'modest', 'mild', 'bashful', 'rash', 'quiet', 'calm', 'gentle', 'careful', 'quirky', 'sassy', 'timid', 'hasty', 'jolly', 'naive', 'serious') NULL,
    MODIFY `teraType` ENUM('unspecified', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL,
    MODIFY `region` ENUM('unspecified', 'ENG', 'JPN', 'SPA', 'SPEU', 'FRE', 'GER', 'ITA', 'CHT', 'CHS', 'KOR') NULL;

-- AlterTable
ALTER TABLE `PokemonWishlist` MODIFY `health` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `attack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `specialAttack` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `defense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `specialDefense` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `speed` ENUM('unspecified', 'best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    MODIFY `nature` ENUM('unspecified', 'hardy', 'lonely', 'adamant', 'naughty', 'brave', 'bold', 'docile', 'impish', 'lax', 'relaxed', 'modest', 'mild', 'bashful', 'rash', 'quiet', 'calm', 'gentle', 'careful', 'quirky', 'sassy', 'timid', 'hasty', 'jolly', 'naive', 'serious') NULL,
    MODIFY `teraType` ENUM('unspecified', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL,
    MODIFY `region` ENUM('unspecified', 'ENG', 'JPN', 'SPA', 'SPEU', 'FRE', 'GER', 'ITA', 'CHT', 'CHS', 'KOR') NULL;
