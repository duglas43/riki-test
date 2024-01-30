-- -----------------------------------------------------
-- Schema riki
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `riki` DEFAULT CHARACTER SET utf8;

USE `riki`;

-- -----------------------------------------------------
-- Table `riki`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `riki`.`User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NULL,
    `passwordHash` VARCHAR(200) NULL,
    `refreshToken` VARCHAR(200) NULL,
    `firstName` VARCHAR(45) NULL,
    `lastName` VARCHAR(45) NULL,
    `createdAt` DATETIME NULL,
    `updatedAt` DATETIME NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `riki`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `riki`.`Role` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `description` VARCHAR(45) NULL,
    `createdAt` DATETIME NULL,
    `updatedAt` DATETIME NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `riki`.`UserRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `riki`.`UserRole` (
    `userId` INT NOT NULL,
    `roleId` INT NOT NULL,
    `createdAt` DATETIME NULL,
    `updatedAt` DATETIME NULL,
    PRIMARY KEY (`userId`, `roleId`),
    INDEX `fk_UserRole_Role1_idx` (`roleId` ASC),
    INDEX `fk_UserRole_User_idx` (`userId` ASC),
    CONSTRAINT `fk_UserRole_User` FOREIGN KEY (`userId`) REFERENCES `riki`.`User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_UserRole_Role1` FOREIGN KEY (`roleId`) REFERENCES `riki`.`Role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;