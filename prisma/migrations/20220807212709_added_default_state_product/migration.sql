-- AlterTable
ALTER TABLE `products` MODIFY `state` ENUM('A', 'B', 'D') NULL DEFAULT 'A';

-- AlterTable
ALTER TABLE `salespromise` MODIFY `statusSale` ENUM('A', 'E', 'C', 'S') NULL DEFAULT 'A';
