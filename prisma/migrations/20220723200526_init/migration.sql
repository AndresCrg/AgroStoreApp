-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `type` ENUM('FRUITS', 'CEREALS', 'LEGOMINOUS', 'VEGETABLES', 'TUBERS') NOT NULL,
    `harvestDate` DATE NOT NULL,
    `harvestLocation` VARCHAR(30) NOT NULL,
    `units` ENUM('KG', 'LB', 'AR') NOT NULL,
    `quantityAvalible` INTEGER NOT NULL,
    `pricePerunit` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `description` VARCHAR(180) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NULL DEFAULT 'USER',
    `state` ENUM('A', 'B', 'D') NULL DEFAULT 'A',

    UNIQUE INDEX `credentials_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(70) NOT NULL,
    `document_type` ENUM('CC', 'CE', 'PA') NOT NULL,
    `document` VARCHAR(45) NOT NULL,
    `address` VARCHAR(70) NOT NULL,
    `city` VARCHAR(70) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `credentialId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_document_key`(`document`),
    UNIQUE INDEX `users_credentialId_key`(`credentialId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salesPromise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userSellerId` INTEGER NOT NULL,
    `userBuyerId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `statusSale` ENUM('A', 'E', 'C', 'S') NOT NULL,
    `saleQuantity` INTEGER NOT NULL,
    `pricePerUnit` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_credentialId_fkey` FOREIGN KEY (`credentialId`) REFERENCES `credentials`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salesPromise` ADD CONSTRAINT `salesPromise_userSellerId_fkey` FOREIGN KEY (`userSellerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salesPromise` ADD CONSTRAINT `salesPromise_userBuyerId_fkey` FOREIGN KEY (`userBuyerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salesPromise` ADD CONSTRAINT `salesPromise_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
