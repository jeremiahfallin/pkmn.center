-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `userId`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `discriminator` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `types` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonWishlist` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `pokemonId` INTEGER NOT NULL,
    `health` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `attack` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `specialAttack` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `defense` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `specialDefense` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `speed` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `level` INTEGER NULL,
    `nature` ENUM('any', 'hardy', 'lonely', 'adamant', 'naughty', 'brave', 'bold', 'docile', 'impish', 'lax', 'relaxed', 'modest', 'mild', 'bashful', 'rash', 'quiet', 'calm', 'gentle', 'careful', 'quirky', 'sassy', 'timid', 'hasty', 'jolly', 'naive', 'serious') NULL,
    `ability` VARCHAR(191) NULL,
    `teraType` ENUM('any', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL,
    `shiny` BOOLEAN NULL,
    `region` ENUM('any', 'ENG', 'JPN', 'SPA', 'SPEU', 'FRE', 'GER', 'ITA', 'CHT', 'CHS', 'KOR') NULL,
    `touch` BOOLEAN NULL,

    INDEX `userId`(`userId`),
    INDEX `pokemonId`(`pokemonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonListing` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `pokemonId` INTEGER NOT NULL,
    `health` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `attack` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `specialAttack` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `defense` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `specialDefense` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `speed` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `level` INTEGER NULL,
    `nature` ENUM('any', 'hardy', 'lonely', 'adamant', 'naughty', 'brave', 'bold', 'docile', 'impish', 'lax', 'relaxed', 'modest', 'mild', 'bashful', 'rash', 'quiet', 'calm', 'gentle', 'careful', 'quirky', 'sassy', 'timid', 'hasty', 'jolly', 'naive', 'serious') NULL,
    `ability` VARCHAR(191) NULL,
    `teraType` ENUM('any', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL,
    `shiny` BOOLEAN NULL,
    `region` ENUM('any', 'ENG', 'JPN', 'SPA', 'SPEU', 'FRE', 'GER', 'ITA', 'CHT', 'CHS', 'KOR') NULL,
    `free` BOOLEAN NULL,
    `touch` BOOLEAN NULL,
    `acceptOffers` BOOLEAN NULL,

    INDEX `userId`(`userId`),
    INDEX `pokemonId`(`pokemonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonOffer` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `pokemonId` INTEGER NOT NULL,
    `health` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `attack` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `specialAttack` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `defense` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `specialDefense` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `speed` ENUM('best', 'fantastic', 'veryGood', 'prettyGood', 'decent', 'noGood') NULL,
    `level` INTEGER NULL,
    `nature` ENUM('any', 'hardy', 'lonely', 'adamant', 'naughty', 'brave', 'bold', 'docile', 'impish', 'lax', 'relaxed', 'modest', 'mild', 'bashful', 'rash', 'quiet', 'calm', 'gentle', 'careful', 'quirky', 'sassy', 'timid', 'hasty', 'jolly', 'naive', 'serious') NULL,
    `ability` VARCHAR(191) NULL,
    `teraType` ENUM('any', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy') NULL,
    `shiny` BOOLEAN NULL,
    `region` ENUM('any', 'ENG', 'JPN', 'SPA', 'SPEU', 'FRE', 'GER', 'ITA', 'CHT', 'CHS', 'KOR') NULL,
    `touch` BOOLEAN NULL,
    `listingId` VARCHAR(191) NOT NULL,

    INDEX `listingId`(`listingId`),
    INDEX `userId`(`userId`),
    INDEX `pokemonId`(`pokemonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
