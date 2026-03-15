-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Autolote_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Autolote_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Autolote_DB` DEFAULT CHARACTER SET utf8 ;
USE `Autolote_DB` ;

-- -----------------------------------------------------
-- Table `Autolote_DB`.`Vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Autolote_DB`.`Vehiculos` (
  `idVehiculo` INT NOT NULL AUTO_INCREMENT,
  `Marca` VARCHAR(100) NOT NULL,
  `Modelo` VARCHAR(100) NOT NULL,
  `Año` INT NOT NULL,
  `Color` VARCHAR(50) NOT NULL,
  `Precio` DOUBLE NOT NULL,
  `Descripcion` TEXT NOT NULL,
  `Estado` ENUM('Disponible', 'No disponible', 'Vendido') NOT NULL,
  `Imagenes` TEXT NOT NULL,
  `Fecha_Ingreso` DATETIME NOT NULL,
  PRIMARY KEY (`idVehiculo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Autolote_DB`.`Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Autolote_DB`.`Clientes` (
  `idClientes` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Correo` VARCHAR(45) NOT NULL,
  `Telefono` VARCHAR(45) NOT NULL,
  `Direccion` VARCHAR(45) NULL,
  `Fecha_Registro` DATE NOT NULL,
  PRIMARY KEY (`idClientes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Autolote_DB`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Autolote_DB`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Apellido` VARCHAR(50) NOT NULL,
  `Correo` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Rol` ENUM('Administracion', 'Vendedor') NOT NULL,
  `Telefono` INT NOT NULL,
  `Estado` ENUM('Activo', 'Inactivo') NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  UNIQUE INDEX `Telefono_UNIQUE` (`Telefono` ASC) VISIBLE,
  UNIQUE INDEX `Estado_UNIQUE` (`Estado` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Autolote_DB`.`Ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Autolote_DB`.`Ventas` (
  `idVentas` INT NOT NULL AUTO_INCREMENT,
  `Fecha_venta` DATETIME NOT NULL,
  `Subtotal` DOUBLE NOT NULL,
  `Impuesto` DOUBLE NOT NULL,
  `Total` DOUBLE NOT NULL,
  `Clientes_idClientes` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  `Vehiculos_idVehiculo` INT NOT NULL,
  PRIMARY KEY (`idVentas`, `Clientes_idClientes`, `Usuarios_idUsuarios`, `Vehiculos_idVehiculo`),
  INDEX `fk_Ventas_Clientes_idx` (`Clientes_idClientes` ASC) VISIBLE,
  INDEX `fk_Ventas_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  INDEX `fk_Ventas_Vehiculos1_idx` (`Vehiculos_idVehiculo` ASC) VISIBLE,
  CONSTRAINT `fk_Ventas_Clientes`
    FOREIGN KEY (`Clientes_idClientes`)
    REFERENCES `Autolote_DB`.`Clientes` (`idClientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ventas_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `Autolote_DB`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ventas_Vehiculos1`
    FOREIGN KEY (`Vehiculos_idVehiculo`)
    REFERENCES `Autolote_DB`.`Vehiculos` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Autolote_DB`.`Consultas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Autolote_DB`.`Consultas` (
  `idConsultas` INT NOT NULL AUTO_INCREMENT,
  `Descripcion` TEXT NOT NULL,
  `Cotizacion` DOUBLE NULL,
  `Fecha` DATE NULL,
  `Estado` ENUM('Pendiente', 'Finalizado', 'En consulta') NULL,
  `Clientes_idClientes` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  `Vehiculos_idVehiculo` INT NOT NULL,
  PRIMARY KEY (`idConsultas`, `Clientes_idClientes`, `Usuarios_idUsuarios`, `Vehiculos_idVehiculo`),
  INDEX `fk_Consultas_Clientes1_idx` (`Clientes_idClientes` ASC) VISIBLE,
  INDEX `fk_Consultas_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  INDEX `fk_Consultas_Vehiculos1_idx` (`Vehiculos_idVehiculo` ASC) VISIBLE,
  CONSTRAINT `fk_Consultas_Clientes1`
    FOREIGN KEY (`Clientes_idClientes`)
    REFERENCES `Autolote_DB`.`Clientes` (`idClientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Consultas_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `Autolote_DB`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Consultas_Vehiculos1`
    FOREIGN KEY (`Vehiculos_idVehiculo`)
    REFERENCES `Autolote_DB`.`Vehiculos` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Autolote_DB`.`Prueba_Manejo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Autolote_DB`.`Prueba_Manejo` (
  `idPrueba_Manejo` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATETIME NOT NULL,
  `Estado` ENUM('Rechazada', 'Pendiente', 'Aprobada', 'Realizada') NOT NULL,
  `Fecha_Prueba` DATETIME NULL,
  `Descripcion` TEXT NULL,
  `Clientes_idClientes` INT NOT NULL,
  `Vehiculos_idVehiculo` INT NOT NULL,
  `Usuarios_idUsuarios` INT NOT NULL,
  PRIMARY KEY (`idPrueba_Manejo`, `Clientes_idClientes`, `Vehiculos_idVehiculo`, `Usuarios_idUsuarios`),
  INDEX `fk_Prueba_Manejo_Clientes1_idx` (`Clientes_idClientes` ASC) VISIBLE,
  INDEX `fk_Prueba_Manejo_Vehiculos1_idx` (`Vehiculos_idVehiculo` ASC) VISIBLE,
  INDEX `fk_Prueba_Manejo_Usuarios1_idx` (`Usuarios_idUsuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Prueba_Manejo_Clientes1`
    FOREIGN KEY (`Clientes_idClientes`)
    REFERENCES `Autolote_DB`.`Clientes` (`idClientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Prueba_Manejo_Vehiculos1`
    FOREIGN KEY (`Vehiculos_idVehiculo`)
    REFERENCES `Autolote_DB`.`Vehiculos` (`idVehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Prueba_Manejo_Usuarios1`
    FOREIGN KEY (`Usuarios_idUsuarios`)
    REFERENCES `Autolote_DB`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
