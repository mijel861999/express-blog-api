CREATE DATABASE IF NOT EXISTS api_blog;

use api_blog;

CREATE TABLE article (
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	content text NOT NULL,
	creation_date DATE,
	image varchar(255),
	user_id int,
	category_id int,
	PRIMARY KEY(id)
);

CREATE TABLE category (
	id int NOT NULL AUTO_INCREMENT,
	category varchar(50) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE user (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(70) NOT NULL,
	password varchar(70) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE comment (
	id int NOT NULL AUTO_INCREMENT,
	comment varchar(250) NOT NULL,
	creation_date DATE,
);


-- INSERTAR VALORES
INSERT INTO category (category) VALUES ('Javascript');


ALTER TABLE article ADD FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE article ADD FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE comment ADD FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE comment ADD FOREIGN KEY (article_id) REFERENCES article(id);


-- AGREGAR VALORES PARA USUARIO
ALTER TABLE user
ADD last_login DATETIME,
ADD created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD access_level INT NOT NULL DEFAULT 0,
ADD full_name VARCHAR(255),
ADD phone_number VARCHAR(20),
ADD email VARCHAR(255) NOT NULL,
ADD password_hash VARCHAR(255) NOT NULL
;

CREATE TABLE access_level (
	id int NOT NULL AUTO_INCREMENT,
	access_level varchar(50) NOT NULL,
	PRIMARY KEY(id)
);


ALTER TABLE user RENAME COLUMN access_level to access_level_id;

ALTER TABLE user ADD FOREIGN KEY (access_level_id) REFERENCES access_level(id);

CREATE TABLE access_token (
	id int NOT NULL AUTO_INCREMENT,
	token varchar(250) NOT NULL,
	PRIMARY KEY(id)
);
