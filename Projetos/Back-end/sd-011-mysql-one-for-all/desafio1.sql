DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE SpotifyClone;
USE SpotifyClone;

CREATE TABLE plano(
plano_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
plano VARCHAR(50) NOT NULL,
valor_plano DECIMAL(5, 2) NOT NULL
) engine = InnoDB;
  
CREATE TABLE  usuario(
usuario_id  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
plano_id INT NOT NULL,
usuario VARCHAR(50) NOT NULL,
idade INT NOT NULL,
FOREIGN KEY(plano_id) REFERENCES plano(plano_id)
) engine = InnoDB;

CREATE TABLE artista(
artista_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
artista VARCHAR(50) NOT NULL
) engine = InnoDB;

CREATE TABLE album(
album_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
artista_id INT NOT NULL,
album  VARCHAR(50) NOT NULL,
FOREIGN KEY(artista_id) REFERENCES artista(artista_id)
) engine = InnoDB;

CREATE TABLE cancao(
cancao_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
album_id INT NOT NULL,
cancao VARCHAR(50) NOT NULL,
FOREIGN KEY(album_id) REFERENCES album(album_id)
) engine = InnoDB;

CREATE TABLE historico_reproducao(
usuario_id INT NOT NULL,
cancao_id INT NOT NULL,
CONSTRAINT PRIMARY KEY(usuario_id, cancao_id),
FOREIGN KEY(usuario_id) REFERENCES usuario(usuario_id),
FOREIGN KEY(cancao_id) REFERENCES cancao(cancao_id)
) engine = InnoDB;

CREATE TABLE seguidores(
usuario_id INT NOT NULL,
artista_id INT NOT NULL,
CONSTRAINT PRIMARY KEY(usuario_id, artista_id),
FOREIGN KEY(usuario_id) REFERENCES usuario(usuario_id),
FOREIGN KEY(artista_id) REFERENCES artista(artista_id)
) engine = InnoDB;

INSERT INTO plano(plano, valor_plano) VALUES
('gratuito', 0),
('familiar', 7.99),
('universitário', 5.99);

INSERT INTO usuario(plano_id, usuario, idade) VALUES
(1, 'Thati', 23),
(2, 'Cintia',35),
(3, 'Bill',20),
(1, 'Roger', 45);

INSERT INTO artista(artista) VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

INSERT INTO album(artista_id, album) VALUES
(1, 'Envious'),
(1, 'Exuberant'),
(2, 'Hallowed Steam'),
(3, 'Incandescent'),
(4, 'Temporary Culture');

INSERT INTO cancao(album_id, cancao) VALUES
(1, 'Soul For Us'),
(1, 'Reflections Of Magic'),
(1, 'Dance With Her Own'),
(2, 'Troubles Of My Inner Fire'),
(2, 'Time Fireworks'),
(3, 'Magic Circus'),
(3, 'Honey, So Do I'),
(3, 'Sweetie, Let''s Go Wild'),
(3, 'She Knows'),
(4, 'Fantasy For Me'),
(4, 'Celebration Of More'),
(4, 'Rock His Everything'),
(4, 'Home Forever'),
(4, 'Diamond Power'),
(4, 'Honey, Let''s Be Silly'),
(5, 'Thang Of Thunder'),
(5, 'Words Of Her Life'),
(5, 'Without My Streets');

INSERT INTO historico_reproducao(usuario_id, cancao_id) VALUES
(1,1),
(1,6),
(1,14),
(1,16),
(2,13),
(2,17),
(2,2),
(2,15),
(3,4),
(3,16),
(3,6),
(4,3),
(4,18),
(4,11);

INSERT INTO seguidores(usuario_id, artista_id) VALUES
(1,1),
(1,4),
(1,3),
(2,1),
(2,3),
(3,2),
(3,1),
(4,4);
