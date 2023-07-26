# Arcnet
Sistema de Monitoramento de Equipamentos
SQL


# Setup Back-End
comando npm install

# SQL DataBase Create
CREATE SCHEMA `cmms` DEFAULT CHARACTER SET utf8 ;

# SQL Tables Create (seguir a sequencia)
CREATE TABLE `cmms`.`tb_area` (
  `col_id_area` INT NOT NULL AUTO_INCREMENT,
  `tb_areacol` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`col_id_area`));


CREATE TABLE `cmms`.`tb_subarea` (
  `col_id_subarea` INT NOT NULL AUTO_INCREMENT,
  `col_subarea` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`col_id_subarea`));

CREATE TABLE `cmms`.`tb_colaborador` (
  `col_registro` INT NOT NULL,
  `col_nome` VARCHAR(45) NOT NULL,
  `col_senha` VARCHAR(45) NOT NULL,
  `col_turno` VARCHAR(45) NULL,
  `col_area` INT NOT NULL,
  `col_nivel_acesso` INT NOT NULL,
  `col_cargo` VARCHAR(45) NOT NULL,
  `col_data_registro` DATETIME NULL,
  `col_revisao` DATETIME NULL,
  `col_status` TINYINT NULL,
  `col_foto` LONGTEXT NULL,
  `col_email` VARCHAR(250) NULL,
  `col_contato` VARCHAR(45) NULL,
  `col_subarea` INT NULL,
  PRIMARY KEY (`col_registro`),
  INDEX `fk_aarea_idx` (`col_area` ASC) VISIBLE,
  INDEX `fk_ssubarea_idx` (`col_subarea` ASC) VISIBLE,
  CONSTRAINT `fk_aarea`
    FOREIGN KEY (`col_area`)
    REFERENCES `cmms`.`tb_area` (`col_id_area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ssubarea`
    FOREIGN KEY (`col_subarea`)
    REFERENCES `cmms`.`tb_subarea` (`col_id_subarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `cmms`.`tb_maquinas` (
  `col_mi` VARCHAR(50) NOT NULL,
  `col_descricao` VARCHAR(100) NOT NULL,
  `col_linha` VARCHAR(45) NOT NULL,
  `col_area` INT NOT NULL,
  `col_datacalendarioam` DATETIME NULL,
  `col_subarea` INT NOT NULL,
  `col_classificacao` VARCHAR(45) NULL,
  `col_fabricante` VARCHAR(45) NULL,
  `col_modelo` VARCHAR(45) NULL,
  `col_numserie` VARCHAR(45) NULL,
  `col_numativo` VARCHAR(45) NULL,
  `col_tipo` VARCHAR(45) NULL,
  `col_familia` VARCHAR(45) NULL,
  `col_valor` VARCHAR(45) NULL,
  `col_datacompra` DATETIME NULL,
  `col_datasop` DATETIME NULL,
  `col_dataregistro` DATETIME NULL,
  `col_datarevisao` DATETIME NULL,
  `col_dataproxrev` DATETIME NULL,
  `col_datainstal` DATETIME NULL,
  `col_datafabricacao` DATETIME NULL,
  `col_datagarantia` DATETIME NULL,
  `col_datarelatorio` DATETIME NULL,
  `col_dataagendatreinamento` DATETIME NULL,
  `col_datamanuais` DATETIME NULL,
  `col_datadiagramaeletrico` DATETIME NULL,
  `col_datadesenhos` DATETIME NULL,
  `col_datacomponentes` DATETIME NULL,
  `col_dataspareparts` DATETIME NULL,
  `col_datasoftware` DATETIME NULL,
  `col_datacalendariopm` DATETIME NULL,
  `col_datasmp` VARCHAR(45) NULL,
  PRIMARY KEY (`col_mi`),
  INDEX `fk_area_idx` (`col_area` ASC) VISIBLE,
  INDEX `fk_subarea_idx` (`col_subarea` ASC) VISIBLE,
  CONSTRAINT `fk_area`
    FOREIGN KEY (`col_area`)
    REFERENCES `cmms`.`tb_area` (`col_id_area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subarea`
    FOREIGN KEY (`col_subarea`)
    REFERENCES `cmms`.`tb_subarea` (`col_id_subarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `cmms`.`tb_ocorrencia` (
  `col_numos` INT NOT NULL,
  `col_data_abertura` DATETIME NOT NULL,
  `col_mi` VARCHAR(45) NOT NULL,
  `col_maquinaparada` VARCHAR(45) NOT NULL,
  `col_seguranca` VARCHAR(45) NULL,
  `col_problema` LONGTEXT NOT NULL,
  `col_registro_operador` INT NOT NULL,
  `col_tecnico` INT NOT NULL,
  `col_tipo` VARCHAR(45) NOT NULL,
  `col_natureza` VARCHAR(45) NOT NULL,
  `col_raiz` VARCHAR(45) NOT NULL,
  `col_atuacao` LONGTEXT NOT NULL,
  `col_obs` LONGTEXT NULL,
  `col_chegada` DATETIME NULL,
  `col_diagnostico` DATETIME NOT NULL,
  `col_desmontagem` DATETIME NOT NULL,
  `col_peca` DATETIME NOT NULL,
  `col_montagem` DATETIME NOT NULL,
  `col_fim` DATETIME NOT NULL,
  `col_status` VARCHAR(45) NOT NULL,
  `col_MBD` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`col_numos`),
  INDEX `fk_maquina_idx` (`col_mi` ASC) VISIBLE,
  CONSTRAINT `fk_maquina`
    FOREIGN KEY (`col_mi`)
    REFERENCES `cmms`.`tb_maquinas` (`col_mi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `cmms`.`tb_maoobrabd` (
  `col_id` INT NOT NULL AUTO_INCREMENT,
  `col_registro` INT NOT NULL,
  `col_inicio` DATETIME NOT NULL,
  `col_fim` DATETIME NOT NULL,
  `col_numos` INT NOT NULL,
  PRIMARY KEY (`col_id`),
  INDEX `fk_registro_tecnico_idx` (`col_registro` ASC) VISIBLE,
  INDEX `fk_ocorr_idx` (`col_numos` ASC) VISIBLE,
  CONSTRAINT `fk_registro_tecnico`
    FOREIGN KEY (`col_registro`)
    REFERENCES `cmms`.`tb_colaborador` (`col_registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ocorr`
    FOREIGN KEY (`col_numos`)
    REFERENCES `cmms`.`tb_ocorrencia` (`col_numos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `cmms`.`tb_spare` (
  `col_cod` VARCHAR(100) NOT NULL,
  `col_base` VARCHAR(45) NOT NULL,
  `col_descricao` VARCHAR(255) NOT NULL,
  `col_grupo` VARCHAR(45) NOT NULL,
  `col_registro` DATETIME NULL,
  `col_revisao` DATETIME NULL,
  `col_min` INT NULL,
  `col_leadtime` INT NULL,
  `col_preco` FLOAT NULL,
  `col_unidade` VARCHAR(45) NULL,
  `col_raridade` VARCHAR(45) NULL,
  `col_obsolecencia` VARCHAR(45) NULL,
  `col_estoque` INT NULL,
  `col_max` INT NULL,
  `col_ehs` VARCHAR(45) NULL,
  `col_qc` VARCHAR(45) NULL,
  `col_proxima_rev` DATETIME NULL,
  `col_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`col_cod`));

CREATE TABLE `cmms`.`tb_bom` (
  `col_id` DECIMAL(50) NOT NULL,
  `col_maquina` VARCHAR(100) NOT NULL,
  `col_peca` VARCHAR(45) NOT NULL,
  INDEX `fk_maquina_cod_idx` (`col_maquina` ASC) VISIBLE,
  INDEX `fk_spare_cod_idx` (`col_peca` ASC) VISIBLE,
  CONSTRAINT `fk_maquina_cod`
    FOREIGN KEY (`col_maquina`)
    REFERENCES `cmms`.`tb_maquinas` (`col_mi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_spare_cod`
    FOREIGN KEY (`col_peca`)
    REFERENCES `cmms`.`tb_spare` (`col_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `cmms`.`tb_kanbanspar` (
  `col_id` INT NOT NULL AUTO_INCREMENT,
  `col_peca` VARCHAR(45) NOT NULL,
  `col_subarea` INT NULL,
  `col_corredor` VARCHAR(45) NULL,
  `col_armario` VARCHAR(45) NULL,
  `col_gaveta` VARCHAR(45) NULL,
  `col_posicao` VARCHAR(45) NULL,
  `col_revisao` DATETIME NULL,
  `col_proxima` DATETIME NULL,
  `col_quantidade` INT NULL,
  PRIMARY KEY (`col_id`),
  INDEX `fk_cod_peca_idx` (`col_peca` ASC) VISIBLE,
  INDEX `fk_subarea_peca_idx` (`col_subarea` ASC) VISIBLE,
  CONSTRAINT `fk_cod_peca`
    FOREIGN KEY (`col_peca`)
    REFERENCES `cmms`.`tb_spare` (`col_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subarea_peca`
    FOREIGN KEY (`col_subarea`)
    REFERENCES `cmms`.`tb_subarea` (`col_id_subarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `cmms`.`tb_spare_ocorrencia` (
  `col_id` INT NOT NULL AUTO_INCREMENT,
  `col_ocorrencia` INT NOT NULL,
  `col_spare` VARCHAR(45) NOT NULL,
  `col_qnt` INT NOT NULL,
  `col_use` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`col_id`),
  INDEX `fk_ocorrencia_spare_idx` (`col_ocorrencia` ASC) VISIBLE,
  INDEX `fk_codspare_ocorrencia_idx` (`col_spare` ASC) VISIBLE,
  CONSTRAINT `fk_ocorrencia_spare`
    FOREIGN KEY (`col_ocorrencia`)
    REFERENCES `cmms`.`tb_ocorrencia` (`col_numos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_codspare_ocorrencia`
    FOREIGN KEY (`col_spare`)
    REFERENCES `cmms`.`tb_spare` (`col_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


# Iniciar o server 
compando npm run dev:server

# Obs
as configurações para o banco de dados esta no arquivo "ormconfig.json"
a porta do servidor pode ser configurada no arquivo "src/server.ts" linha 36

