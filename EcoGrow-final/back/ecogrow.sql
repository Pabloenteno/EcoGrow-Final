create database ecogrow;
use ecogrow;

create table usuario(
	id int primary key auto_increment unique,
    nome varchar(255),
	senha varchar(255),
    email varchar(255) unique,
    tipo enum("adm","usuario")
);


create table plantas(
	id int primary key auto_increment unique,
	imagem text,
    nome varchar(255),
	estacao enum("verão","outono","Primavera","inverno"),
    tempo varchar(255),
    espaco enum("pequeno","médio","grande"),
    agua enum("1","2","3","4","5")
    /*
	Nível	Quantidade Aproximada
	1	5 – 20 mL/dia	
	2	20 – 100 mL/dia	
	3	100 – 300 mL/dia
	4	300 – 700 mL/dia	
	5	700 – 2000+ mL/dia	
	*/
);

create table favoritos(
	id_usuario int,
    id_planta int,
	PRIMARY KEY (id_usuario, id_planta),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	FOREIGN KEY (id_planta) REFERENCES plantas(id)
);

create table plantando(
	id_usuario int,
    id_planta int,
    data timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id_usuario, id_planta),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	FOREIGN KEY (id_planta) REFERENCES plantas(id)
);

CREATE TABLE receita (
    id_receita INT PRIMARY KEY AUTO_INCREMENT,
    id_planta INT NOT NULL, 
    id_usuario INT NOT NULL, 
    nome VARCHAR(255) NOT NULL,
    imagem VARCHAR(255), 
    ingredientes TEXT NOT NULL, 
    preparo TEXT NOT NULL,
    
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_planta) REFERENCES plantas(id)
);

CREATE TABLE informacao (
    id_informacao INT PRIMARY KEY AUTO_INCREMENT,
    id_planta INT NOT NULL,
    conteudo TEXT NOT NULL,
    FOREIGN KEY (id_planta) REFERENCES plantas(id)
);

/*
comandos
*/

SELECT p.* FROM plantas p JOIN favoritos f ON f.id_planta = p.id WHERE f.id_usuario = 1;

SELECT p.*,f.data FROM plantas p JOIN plantando f ON f.id_planta = p.id WHERE f.id_usuario = 2;

SELECT  id_usuario, id_planta, nome, ingredientes, preparo, imagem FROM receita WHERE id_planta = 2;


select * from plantas;
select * from usuario;

INSERT INTO favoritos (id_usuario, id_planta) VALUES (1, 1);

INSERT INTO plantando (id_usuario, id_planta) VALUES (1, 1);

insert into usuario (nome, senha,email,tipo) values("pablo","1234","@pablo","adm");

insert into plantas (nome, estacao,tempo,espaco, agua) values("morango","verao","3 dias","pequeno", "3");
insert into plantas (nome, estacao,tempo,espaco, agua) values("abacate","outono","5 dias","pequeno", "4");

